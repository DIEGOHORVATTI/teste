import { rateLimit as apiRateLimiter, DefaultContext } from 'elysia-rate-limit'

const rateLimitDurationMs = (minute: number) => minute * 60 * 1000

export const rateLimit = apiRateLimiter({
  // 1 minuto
  duration: rateLimitDurationMs(1),
  // Máximo de 100 requisições por minuto
  max: 100,
  errorResponse: 'Muitas solicitações. Tente novamente mais tarde.',
  // Aplica o limite apenas a esta instância (escopo local)
  scoping: 'scoped',

  // Função que retorna o IP do cliente
  generator: (req, server) => {
    // Utiliza o IP real do cliente sem a necessidade de cabeçalhos adicionais
    const clientIpAddress = server?.requestIP(req)?.address ?? ''

    console.info('🟢 ╰┈➤ Ip: ', clientIpAddress)

    return clientIpAddress
  },
  // Não contar falhas como requisições
  countFailedRequest: false,
  // Aumentar o cache para 10.000 entradas
  context: new DefaultContext(10_000),
  // Ativar os cabeçalhos RateLimit-*
  headers: true,
  // Ignorar rate limit para requisições OPTIONS
  skip: req => req.method === 'OPTIONS'
})
