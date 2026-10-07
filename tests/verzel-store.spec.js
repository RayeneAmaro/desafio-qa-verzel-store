const { test, expect } = require('@playwright/test');

const URL_LOJA = 'https://verzel-store.qa-test-verzel-store.workers.dev/';

//Primeiro teste
test('CT12: Aplicação com sucesso de cupom válido com 10% de desconto', async ({ page }) => {
  test.setTimeout(60000);

  // 1. Acessar a loja e aguardar o carregamento
  await page.goto(URL_LOJA, { waitUntil: 'domcontentloaded' });

  // 2. Adicionar o primeiro produto da lista
  await page.getByRole('button', { name: 'Adicionar ao carrinho' }).first().click();

  // 3. Entrar no carrinho
  await page.getByRole('link', { name: 'Carrinho' }).click();

  // 4. Preencher e aplicar o cupom
  await page.getByRole('textbox').fill('BEMVINDO10');
  await page.getByRole('button', { name: 'Aplicar cupom' }).click();

  // 5. Validações
  await expect(page.getByText('Cupom BEMVINDO10 aplicado.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Remover cupom' })).toBeVisible();
});

//Segundo teste
test('CT13: Validação de aplicação de frete grátis em compras acima de R$ 200,00', async ({ page }) => {
  // 1. Acessar a loja
  await page.goto(URL_LOJA);

  // 2. Localizar o card do produto pelo texto e clicar no botão dele
  const cardJaqueta = page.locator('article', { hasText: 'Jaqueta Corta-Vento' });
  await cardJaqueta.getByRole('button', { name: 'Adicionar ao carrinho' }).click();

  // 3. Acessar o carrinho
  await page.getByRole('link', { name: 'Carrinho' }).click();

  // 4. Validar que o frete foi zerado
  await expect(page.getByText('R$ 0,00')).toBeVisible();
});

//Terceiro teste
test('CT14: [API] Validação do cálculo de subtotal, desconto e frete via endpoint /api/carrinho/calcular', async ({ request }) => {
  // 1. Enviar a requisição POST para a API
  const response = await request.post('https://verzel-store.qa-test-verzel-store.workers.dev/api/carrinho/calcular', {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      itens: [
        { produtoId: 'P005', quantidade: 1 } // Mochila Urbana: R$ 100,00
      ],
      cupom: 'BEMVINDO10'
    }
  });

  // 2. Validar cód do status da resposta
  expect(response.status()).toBe(200);

  // 3. Converter a resposta em objeto JSON
  const body = await response.json();

  // 4. Validar as regras de negócio retornadas pela API
  expect(body.subtotal).toBe(100);
  expect(body.desconto).toBe(10);
  expect(body.frete).toBe(19.9);
  expect(body.freteGratis).toBe(false);
  expect(body.total).toBe(109.9);
  expect(body.cupom.aplicado).toBe(true);
  expect(body.cupom.codigo).toBe('BEMVINDO10');
});