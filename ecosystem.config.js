module.exports = {
  apps: [
    {
      name: 'payments',
      script: 'node',
      args: '-r  ./dist/main.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'dev',
        DB_USER: 'root',
        DB_PASSWORD: '123456',
      },
      env_production: {
        NODE_ENV: 'production',
        DB_USER: 'eservicesReport',
        DB_PASSWORD: 'mb!Kqpn*yjc!k5b',
        DB_NAME: 'payment_gateway',
        HYPER_MERCHANT_ENTITY_ID: '8ac7a4c972a8f8790172b6b83ec31875',
        HYPER_MADA_ENTITY_ID: '8ac7a4c972a8f8790172b6b8b538187e',
        HYPER_BEARER_TOKEN: 'OGFjN2E0Yzk3MmE4Zjg3OTAxNzJiNmFhZTY2YjE4NWR8SjhBbThhdzVzcQ==',
        IS_TEST: 0,
      },
    },
  ],
};
