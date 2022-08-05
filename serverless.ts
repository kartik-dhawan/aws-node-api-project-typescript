import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'awsapiprojectts',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'ap-south-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:*',
        ],
        Resource: [
          'arn:aws:dynamodb:ap-south-1:018926851220:table/TSEmployees',
        ]
      },
    ]
  },
  // import the function via paths
  functions: {
    addEmp: {
      handler: 'src/lambdas/addEmp.handler',
      events: [
        {
          http: {
            path: '/',
            method: 'post',
          }
        }
      ]
    },
    fetchEmps: {
      handler: 'src/lambdas/fetchEmps.handler',
      events: [
        {
          http: {
            path: '/',
            method: 'get'
          }
        }
      ]
    },
    fetchEmp: {
      handler: "src/lambdas/fetchEmp.handler",
      events: [
        {
          http: {
            path: '/{id}',
            method: 'get'
          }
        }
      ]
    },
    updateEmp: {
      handler: 'src/lambdas/updateEmp.handler',
      events: [
        {
          http: {
            path: '/{id}',
            method: 'put'
          }
        }
      ]
    },
    deleteEmp: {
      handler: 'src/lambdas/deleteEmp.handler',
      events: [
        {
          http: {
            path: '/{id}',
            method: 'delete'
          }
        }
      ]
    }
  },
  resources: {
    Resources: {
      TSEmployees: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'TSEmployees',
          AttributeDefinitions: [
            {
              AttributeName: 'empId',
              AttributeType: 'S'
            }
          ],
          KeySchema: [
            {
              AttributeName: 'empId',
              KeyType: 'HASH'
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          }
        }
      }
    }
  }
  ,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
