export const db = {
  users: [
    {
      id: 1,
      email: 'avaliador@ufjf.br',
      password: 'senha123',
      name: 'Avaliador Do Código 2',
      create_at: '2025-06-28T17:16:00.000Z',
      tasks: [
        {
          id: 1,
          title: 'Revisar código do módulo A',
          description: 'Analisar a lógica implementada no módulo A e sugerir melhorias.',
          priority: 'HIGH',
          user_id: 1,
        },
        {
          id: 2,
          title: 'Documentar API de usuários',
          description: 'Escrever a documentação da API RESTful do módulo de usuários.',
          priority: 'MEDIUM',
          user_id: 1,
        },
        {
          id: 3,
          title: 'Corrigir erros no formulário de login',
          description: null,
          priority: 'LOW',
          user_id: 1,
        },
      ],
    },
    {
      id: 2,
      email: 'exemplo@ufjf.br',
      name: 'Avaliador Do Código 2',
      password: 'senha123',
      create_at: '2025-06-28T17:16:00.000Z',
      tasks: [
        {
          id: 4,
          title: 'Testar integração com banco de dados',
          description: 'Executar testes de conexão e verificar integridade dos dados.',
          priority: 'LOW',
          user_id: 2,
        },
        {
          id: 5,
          title: 'Atualizar dependências do projeto',
          description: null,
          priority: 'HIGH',
          user_id: 2,
        },
        {
          id: 6,
          title: 'Revisar interface do painel administrativo',
          description: 'Verificar usabilidade e acessibilidade da interface.',
          priority: 'MEDIUM',
          user_id: 2,
        },
      ],
    },
  ],
};
