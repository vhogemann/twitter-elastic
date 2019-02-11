Tweeter-Elastic
====

Esse repositório tem um par de scripts que salva tweets (dump-tweets.js) como arquivos *.json* a partir da API do Twitter, e outro que carrega esses arquivos em uma instância do *Elastic Search* rodando em um docker local.

Tanto o *Elastic Search*, quanto uma instância do *Kibana* para visualização podem ser iniciados usando *docker-compose* utilizando o arquivo de configuração que está no repo.

Os tweets são salvos em uma pasta *tweets* que deve ser criada, o arquivo *tweets.zip* tem mais ou menos 5mil arquivos que podem ser utilizados, caso você não queira se meter com a API do Twitter.

Objetivo
---
Isso aqui é só um exercício pra ver se eu consigo descobrir quem está por detrás da conta [@startupdareal](https://twitter.com/startupdareal). A inspiração veio do [Who is horse_js?](https://whoishorsejs.com/), mas eu estou utilizando ferramentas diferentes pra analisar os dados.

Resultados
---
Nenhum ainda, eu mesmo não tenho muito tempo pra me dedicar a isso, e o Twitter limita muito a quantidade de dados que eu consigo baixar por vez. Se estiver curioso em saber como vai o progresso, de vez em quando eu posto alguma coisa na minha conta do Twitter [@vhogemann](https://twitter.com/vhogemann).