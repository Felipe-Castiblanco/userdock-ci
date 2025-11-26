import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.fixture
def driver():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    options.binary_location = "/usr/bin/chromium"
    driver = webdriver.Chrome(options=options)
    yield driver
    driver.quit()

def test_create_user(driver):
    driver.get("http://frontend:80/create.html")
    driver.find_element(By.ID, "name").send_keys("Andrés")
    driver.find_element(By.ID, "email").send_keys("andres@example.com")
    driver.find_element(By.ID, "phone").send_keys("123456789")
    driver.find_element(By.ID, "submitBtn").click()
    WebDriverWait(driver, 10).until(EC.url_contains("index.html"))

def test_list_user(driver):
    driver.get("http://frontend:80/index.html")
    table_body = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "usersTbody"))
    )
    assert "Andrés" in table_body.text

def test_view_user(driver):
    driver.get("http://frontend:80/view.html?id=1")  # ajusta ID según backend
    user_view = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "userView"))
    )
    assert "Andrés" in user_view.text
    assert "andres@example.com" in user_view.text

def test_update_user(driver):
    driver.get("http://frontend:80/create.html?id=1")
    name_field = driver.find_element(By.ID, "name")
    name_field.clear()
    name_field.send_keys("Andrés Actualizado")
    driver.find_element(By.ID, "submitBtn").click()
    WebDriverWait(driver, 10).until(EC.url_contains("index.html"))
    table_body = driver.find_element(By.ID, "usersTbody")
    assert "Andrés Actualizado" in table_body.text

def test_delete_user(driver):
    driver.get("http://frontend:80/index.html")
    delete_button = driver.find_element(
        By.XPATH, "//tr[td[contains(text(),'Andrés Actualizado')]]//button[@class='btn btn-danger btn-sm']"
    )
    delete_button.click()
    WebDriverWait(driver, 10).until(
        EC.text_to_be_present_in_element((By.ID, "usersTbody"), "No hay usuarios")
    )
