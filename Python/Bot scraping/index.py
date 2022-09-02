from selenium import webdriver
from selenium.webdriver.support.select import Select
from selenium.webdriver.common.by import By
import time

driver = webdriver.Edge('msedgedriver.exe')
options = webdriver.EdgeOptions()
options.add_argument("--incognito")
options.add_argument("--headless")
driver = webdriver.Edge(options=options)
driver.get('https://www.google.com/finance/quote/USD-BRL?sa=X&ved=2ahUKEwjsvcSxzu35AhWuJrkGHeiiCL4QmY0JegQIAhAb')
driver.maximize_window()

time.sleep(5)
valor_real = driver.find_element(By.XPATH, '//*[@id="cookie-consent-accept"]').text
print(f'o valor do dolar é de ${valor_real}')