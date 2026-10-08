# Desafio Técnico de QA - Verzel

Repositório com o planejamento de testes, execução manual, relatório de bugs e automação de testes para a loja virtual Verzel Store.

---

## 📁 Documentação do Projeto

Toda a documentação completa dos testes manuais, matriz de cobertura, casos de teste em Gherkin e relatório do bug encontrado estão centralizados no arquivo PDF:
* 📄 **Documento Completo:** localizado em `docs`

As capturas de tela das evidências e dos bugs encontram-se organizadas dentro da pasta `docs/imgs/`.

---

## 🧪 Automação com Playwright

Os testes automatizados cobrem 2 cenários de interface e 1 de API, concentrados no arquivo `tests/verzel-store.spec.js`:

* **CT12:** `[UI]` Aplicação de cupom de desconto de 10% no carrinho.
* **CT13:** `[UI]` Validação de frete grátis em compras acima de R$ 200,00.
* **CT14:** `[API]` Validação do cálculo de subtotal, desconto e frete via endpoint `/api/carrinho/calcular`.

---

## 💡 Decisões Técnicas

* **Organização dos testes em um único arquivo (`verzel-store.spec.js`):**  
  Os 3 testes foram mantidos juntos para simplificar a visualização do avaliador e permitir a execução completa com apenas um comando. Entendo que, em um projeto real com dezenas de testes, a boa prática recomendada seria separar em pastas distintas para UI e API.

* **Seleção de elementos:**  
  Uso de seletores baseados em acessibilidade e texto visível (`getByRole`, nomes de botões), garantindo testes mais estáveis e próximos da experiência real do utilizador.

* **Validação direta de API:**  
  Inclusão de validação no endpoint `/api/carrinho/calcular` para assegurar que as regras de negócio de descontos e taxas funcionam diretamente na camada de backend, sem depender da interface.

---

## 🚀 Como Executar os Testes

1. Clonar o repositório:
   ```bash
   git clone https://github.com/RayeneAmaro/desafio-qa-verzel-store.git
   cd desafio-qa-verzel-store
   ```

2. Instalar as dependências:
   ```bash
    npm install
    ```

3. Executar os testes em modo headless:
   ```bash
    npx playwright test
    ```

4. Visualizar o relatório de execução:
    ```bash
    npx playwright show-report
    ```

## Obrigada 🤗