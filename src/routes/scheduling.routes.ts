import { Elysia, error } from 'elysia'

import { jwt } from '@/middlewares/jwt'

/* 
rota criação de agendamento
- nome
- descrição
- id user
- data de agendamento máximo

rota de listagem de agendamentos
- listame por paginação
- data de agendamento
- data de naciemnto do usuario
- dados de cpf ou cnpj do usuria

{
  "name": "marcar consulta",
  "description": "Marcar consulta",
  "idUser": "5f8f4b3b9f1f3b0017f3b3b1",
  "idDoctor": "5f8f4b3b9f1f3b0017f3b3b2",
  "date": "2020-10-20",
  "hour": "10:00",
  "status": "pendente"
}

TATUS AGENDAMENTO 

App: Realizou a solicitação do agendamento 
STATUS: ANÁLISE

Backoffice: Selecionou o agendamento recebido do app par "Marcar Consulta"
STATUS: PENDENTE

Backoffice: Entra na fila 
STATUS: AGUARDANDO PAGAMENTO

APP: Caso o usuário não comparecça na consulta ou realize o cancelamento do agendamento, o msmo ficara bloqueado durante 30 dias.
STATUS: Bloqueado 


Backoffice: Caso o usuário não realize o pagamento o mesmo ficara bloqueado para realizaçaõ de agendamentos
STATUS: INADIMPLENTE

- Agendamento de Consulta
História do usuário
Eu, sendo um consultor com acesso ao backoffice, quero visualizar as informações enviadas pelo cliente (especialidade, datas e CEP), para que eu possa contatar manualmente as clínicas mais próximas e concluir o agendamento da consulta.

Critérios de aceite
 O sistema deve exibir os seguintes dados enviados pelo cliente:
Dados pessoais: Nome completo, telefone, e-mail e endereço.
Especialidade médica solicitada.
Duas datas possíveis para agendamento.
CEP informado.
Valor 
Gerar o Protocolo 
Ao selecionar a opção “ Gerar Protocolo” o status do agendamento da consulta deve ser alterado para
*/

const router = new Elysia({ tags: ['scheduling'], prefix: '/scheduling' })

export default router
