**CI/CD 내용이 필요하신 분은 다음 글을 참고하세요.**

[![Tistory'S stats](https://github-readme-tistory-card.vercel.app/api?name=Aierse&postId=7)](https://aierse.tistory.com)

---

요즘 Serverless 아키텍쳐의 인기가 많아 NestJS + Lambda + DynamoDB를 활용해 환경을 구성해 보았는데요. 신기술이면서, 관련 정보도 많이 없어 환경 구성에 정말 애를 많이 먹었습니다. 특히 AWS 자체가 업데이트되며 과거 문서들을 따라하다보면 막히는 경우가 있고, 해결하는데 정말 어려움을 겪었네요.

`2024-01-15`일에 구동확인 했습니다.

**AWS Credential 자체가 업데이트되며 일어난 버그가 있으니 해당 글을 꼼꼼히 확인해주세요.**

## NestJS 생성

NestJS는 개발자가 좀 더 편리하게 NestJS 프로젝트를 개발하고 설정할 수 있도록 강력한 CLI(명령 줄 인터페이스) 도구를 제공하고 있습니다.

`npm i -g @nestjs/cli`

명령어로 NestJS CLI를 설치합니다.

다운로드가 완료되었다면 `cmd`에서 `nest` 명령어를 실행하면 아래와 같이 간단한 설명을 확인할 수 있습니다.

```
$ nest
Usage: nest <command> [options]

Options:
  -v, --version                                   Output the current version.
  -h, --help                                      Output usage information.

Commands:
  new|n [options] [name]                          Generate Nest application.
  build [options] [app]                           Build Nest application.
  start [options] [app]                           Run Nest application.
  info|i                                          Display Nest project details.
  add [options] <library>                         Adds support for an external library to your project.
  generate|g [options] <schematic> [name] [path]  Generate a Nest element.
    Schematics available on @nestjs/schematics collection:
      ┌───────────────┬─────────────┬──────────────────────────────────────────────┐
      │ name          │ alias       │ description                                  │
      │ application   │ application │ Generate a new application workspace         │
      │ class         │ cl          │ Generate a new class                         │
      │ configuration │ config      │ Generate a CLI configuration file            │
      │ controller    │ co          │ Generate a controller declaration            │
      │ decorator     │ d           │ Generate a custom decorator                  │
      │ filter        │ f           │ Generate a filter declaration                │
      │ gateway       │ ga          │ Generate a gateway declaration               │
      │ guard         │ gu          │ Generate a guard declaration                 │
      │ interceptor   │ itc         │ Generate an interceptor declaration          │
      │ interface     │ itf         │ Generate an interface                        │
      │ library       │ lib         │ Generate a new library within a monorepo     │
      │ middleware    │ mi          │ Generate a middleware declaration            │
      │ module        │ mo          │ Generate a module declaration                │
      │ pipe          │ pi          │ Generate a pipe declaration                  │
      │ provider      │ pr          │ Generate a provider declaration              │
      │ resolver      │ r           │ Generate a GraphQL resolver declaration      │
      │ resource      │ res         │ Generate a new CRUD resource                 │
      │ service       │ s           │ Generate a service declaration               │
      │ sub-app       │ app         │ Generate a new application within a monorepo │
      └───────────────┴─────────────┴──────────────────────────────────────────────┘
```

**이제 NestJS 프로젝트를 생성해보겠습니다.**

`nest new <projectName>` 명령어를 입력하세요. `<projectName>` 에는 프로젝트의 이름을 입력해주세요.

```
$ nest new nest-lambda-example
⚡  We will scaffold your app in a few seconds..

? Which package manager would you ❤️  to use? (Use arrow keys)
> npm
  yarn
  pnpm
```

사용하실 프로젝트 매니저를 선택하세요. 예제에서는 npm을 선택했습니다.

생성이 완료되면 **package.json**이 존재하는 파일 경로에서 `npm run start` 를 입력해 실행이 되는지 확인합니다.

```
user@Aierse-Desktop MINGW64 /c/Github/nest-lambda-example (master)
$ npm run start

> nest-lambda-example@0.0.1 start
> nest start

[Nest] 1396  - 2024. 01. 29. 오후 8:18:00     LOG [NestFactory] Starting Nest application...
[Nest] 1396  - 2024. 01. 29. 오후 8:18:00     LOG [InstanceLoader] AppModule dependencies initialized +11ms
[Nest] 1396  - 2024. 01. 29. 오후 8:18:00     LOG [RoutesResolver] AppController {/}: +28ms
[Nest] 1396  - 2024. 01. 29. 오후 8:18:00     LOG [RouterExplorer] Mapped {/, GET} route +2ms
[Nest] 1396  - 2024. 01. 29. 오후 8:18:00     LOG [NestApplication] Nest application successfully started +2ms
```

![image](https://github.com/Aierse/Aierse/assets/68111814/bb325d3f-6f12-4b6e-90cb-9f10b41cdd77)

정상적으로 실행되었다면 `localhost:3000` 에 GET 요청 시 Hello, World! 값이 리턴됩니다.

실행되지 않는다면 첫번째 줄 `/c/Github/nest-lambda-example` 경로가 본인의 `package.json` 경로와 일치하는지 확인하세요.

## Lambda 구성

NestJS의 구성을 완료했다면 이제 Lambda 환경을 구성해야할 차례입니다.  
Lambda는 AWS측의 권한 설정과 NestJS 프로젝트의 환경설정 두 가지를 수행해야 하는데요.

먼저 AWS 측의 권한 설정을 해야 프로젝트 환경설정을 할 수 있으므로, AWS 측부터 설정 해보겠습니다.

### 콘솔홈 - IAM

Lambda를 실행하려면 먼저 권한을 부여해야합니다. `IAM - 사용자 관리` 탭에서 그룹을 생성합니다.

![image](https://github.com/Aierse/Aierse/assets/68111814/a75d24d1-5e6e-489c-9db6-130b0f356c2e)

Lambda + DynamoDB를 구성하려면 아래와 같은 권한 목록이 필요합니다.

- **AmazonAPIGatewayAdministrator**
- **AmazonDynamoDBFullAccess**
- **AmazonS3FullAccess**
- **AWSCloudFormationFullAccess**
- **AWSLambda_FullAccess**
- **AWSLambdaDynamoDBExecutionRole**
- **CloudWatchLogsFullAccess**
- **IAMFullAccess**

![image](https://github.com/Aierse/Aierse/assets/68111814/7f872b71-72eb-4693-8375-7bae054fd010)

**사용자 그룹 생성을 완료했다면 이제 사용자를 생성할 차례입니다.**  
`IAM - 사용자` 탭에서 사용자를 생성합니다.

![image](https://github.com/Aierse/Aierse/assets/68111814/21c76816-f42d-427d-84db-eb710983923e)

사용자 그룹에 포함시켜 권한을 적용시킵니다. 생성된 사용자를 클릭하여 액세스 키를 생성합니다.

![image](https://github.com/Aierse/Aierse/assets/68111814/d2c80ace-f5eb-4c45-bd67-32e8afc40c16)

`액세스 키 만들기`를 클릭하세요.

![화면 캡처 2024-01-29 203942](https://github.com/Aierse/Aierse/assets/68111814/a627ab61-0c9a-4bd6-9257-8388bc4ddea6)

**현재 과정을 잘 따라오더라도 이 부분에서 오류가 날 수 있는데요.**

액세스 키를 인증하는 AWS Credential이 2.0으로 업데이트되면서 더 이상 키에 **+, /** 등 특수문자가 포함된 키가 생성되면 인증 오류가 발생합니다. 이 부분에서 저도 정말 많이 해멨는데요.

놀랍게도 **해결방법은 특수문자가 포함되지 않는 액세스 키가 생성될 때까지 계속 생성하는 방법** 뿐입니다.

액세스 키 뿐만 아니라 비밀 액세스 키에도 특수문자가 없어야 하니 계속 리롤을 하는 방법밖에 없습니다.

![image](https://github.com/Aierse/Aierse/assets/68111814/ac4cf885-7acd-4392-ad9a-e53de1f9afd5)

새로운 키를 발급 받는 방법은 `보안 자격 증명 탭의 액세스 키`에서 키를 삭제한 후 새로 생성하면 됩니다. **특수문자가 포함되지 않은 키**를 생성하셨다면 AWS 측의 환경설정은 모두 끝났습니다. 이제 프로젝트 환경설정을 할 차례입니다.

> **프로젝트 환경설정**

먼저 라이브러리를 설치합니다.

```
npm i aws-sdk
npm i aws-lambda
npm i @nestjs/config
npm i @serverless/utils
npm i aws-serverless-express
npm i express
```

설치를 완료하고 `package.json`이 존재하는 폴더에 `serverless.yaml`을 생성하고 아래 코드를 붙여넣기 합니다.

```
service: nestjs-serverless-dynamo
plugins:
  - serverless-plugin-optimize
  - serverless-dynamodb

functions:
  app:
    handler: dist/serverless.handler
    events:
      - http:
          method: ANY
          path: /
      - http:
          method: ANY
          path: '{proxy+}'

provider:
  name: aws
  runtime: nodejs20.x
  region: ap-northeast-2
  apiGateway:
    shouldStartNameWithService: true

  environment:
    AWS_NODEJS_CONNECTION_REUSE_ENABLED: 1
    NODE_OPTIONS: --enable-source-maps --stack-trace-limit=1000
    DYNAMODB_ENDPOINT: ${self:custom.endpoints.dynamodbURL}

  iam:
    role:
      statements:
        - Effect: 'Allow'
          Action:
            - 'dynamodb:DescribeTable'
            - 'dynamodb:Query'
            - 'dynamodb:Scan'
            - 'dynamodb:GetItem'
            - 'dynamodb:PutItem'
            - 'dynamodb:UpdateItem'
            - 'dynamodb:DeleteItem'
            # DynamoDB의 모든 테이블을 불러옵니다.
          Resource: arn:aws:dynamodb:ap-northeast-2:*:table/*

custom:
  esbuild:
    bundle: true
    minify: false
    sourcemap: true
    exclude: aws-sdk
    target: node14
    define: 'require.resolve: undefined'
    platform: node
    concurrency: 10

  dynamodb:
    start:
      port: 6000
      inMemory: true
      migrate: true
    stages: dev
  endpoints:
    dynamodbURL: 'http://localhost:6000'
# 테이블을 생성하려면 주석을 해제하세요.
# 로컬환경에서는 데이터베이스가 초기화되므로 사용해야합니다.
# resources:
#   Resources:
#     TestTable:
#       Type: AWS::DynamoDB::Table
#       Properties:
#         TableName: Test
#         AttributeDefinitions:
#           - AttributeName: id
#             AttributeType: S

#         KeySchema:
#           - AttributeName: id
#             KeyType: HASH

#         ProvisionedThroughput:
#           ReadCapacityUnits: 1
#           WriteCapacityUnits: 1
```

`serverless.yaml`에 작성된 plugin은 추가로 다운로드 받아야합니다.

```
npx serverless plugin install -n serverless-plugin-optimize
npx serverless plugin install -n serverless-dynamodb
```

여기까지 완료했다면 이제 거의 다 왔습니다!

`AWS CLI`를 설치합니다.

[다운로드 경로](https://docs.aws.amazon.com/ko_kr/cli/latest/userguide/getting-started-install.html)

설치를 완료했다면 `cmd`에서 `aws configure` 명령어로 액세스 키를 할당합니다.

```
$ aws configure
AWS Access Key ID [None]: YOUR ACCESS KEY
AWS Secret Access Key [None]: YOUR SECRET KEY
Default region name [None]: ap-northeast-2
Default output format [None]:
```

이제 배포를 해봅시다!

```
$npx serverless deploy

Deploying nestjs-serverless-dynamo to stage dev (ap-northeast-2)

✔ Service deployed to stack nestjs-serverless-dynamo-dev (133s)

endpoints:
  ANY - https://xbokraywv9.execute-api.ap-northeast-2.amazonaws.com/dev/
  ANY - https://xbokraywv9.execute-api.ap-northeast-2.amazonaws.com/dev/{proxy+}
functions:
  app: nestjs-serverless-dynamo-dev-app (26 MB)

1 deprecation found: run 'serverless doctor' for more details

Monitor Express APIs by route with the Serverless Console: run "serverless --console"
```

**위처럼 endpoints가 등장하면 배포에 성공한 겁니다!**

![image](https://github.com/Aierse/Aierse/assets/68111814/3cd4428c-d8e1-4256-a1de-bc26079e4b43)

localhost:3000에서 응답받았던 Hello, World!입니다!

여기까지 수고 많으셨습니다. 이제는 정말 마지막 **DynamoDB** 연동만 남았습니다.

사실 AWS 권한, 프로젝트 환경설정이 끝났으니 코드만 작성하면 되는데요.

### /src/dynamo/dynamo.service.ts 파일

```
import { Injectable } from '@nestjs/common'
import * as AWS from 'aws-sdk'

@Injectable()
export class DynamoService {
  connect(): AWS.DynamoDB.DocumentClient {
    return new AWS.DynamoDB.DocumentClient()
  }
}
```

---

### /src/dynamo/dynamo.module.ts 파일

```
import { DynamoService } from './dynamo.service'
import { Global, Module } from '@nestjs/common'

@Global()
@Module({
  providers: [DynamoService],
  exports: [DynamoService]
})
export class DynamoModule {}
```

이제 연결까지 끝났습니다! 이제 DynamoModule을 활용하여 DB를 사용하면 됩니다.

**만약 DB 요청시 `missing region in config` 에러가 난다면 `.env` 파일에 리전을 등록해 보세요.**

AWS CLI로 할당된 리전을 제대로 불러오지 못하는 경우가 간혹 있습니다.

간단하게 DB를 연동하여 CRUD를 구현한 예제로 글을 마칩니다.

## 예제

![image](https://github.com/Aierse/Aierse/assets/68111814/a9b29c83-d3b7-4ae7-8638-44d2d5fa7b08)

칼럼이 id 하나뿐인 Test 테이블 생성

[소스코드](https://github.com/Aierse/NestJS-Lambda-DynamoDB)

`/src/app.*` 파일들과 `/src/entity` 만 확인하시면 됩니다.
