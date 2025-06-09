# AwesomeProject

Para a correta execução deste projeto, outros dois projetos são necessários: **LoginAPI** e **react-native-device-manufacturer-info**

**LoginAPI**:   
https://github.com/DanielSanLopes/LoginAPI

**react-native-device-manufacturer-info**:   
https://github.com/DanielSanLopes/react-native-device-manufacturer-info

&nbsp;&nbsp;&nbsp;&nbsp;

1º - Clone este repositório, LoginAPI e react-native-device-manufacturer-info de forma que a estrutura de pastas fique a seguinte:

DiretórioPai  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| ---- AwesomeProject  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| ---- LoginAPI  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| --- react-native-device-manufacturer-info  

Ou seja, os três projetos serão subpastas da mesma pasta. Tanto por uma questão de comodidade quanto de funcionabilidade, já que react-native-device-manufacturer-info 
é importado dentro de AwesomeProject

Usando o terminal, acesse a pasta raíz de cada projeto e execute o  comando ``yarn``  para instalar as dependências

É necessário ter o AndroidStudio instalado para rodar um emulador com a **API 35** ou superior do Android. 

Na pasta do AwesomeProject, execute ``yarn run android`` para instalar o app no emulador (que já deve estar aberto) 
Na pasta da LoginAPI, execute ``yarn start``  para inicializar o servidor localmente

Uma vez instaladas as dependências em todas as pastas e todos os comandos supracitados executados, o app está pronto para o uso.

&nbsp;&nbsp;&nbsp;&nbsp;

### Instruções de uso do App
***

O usuário padrão é ``user@exemplo.com`` e a senha é ``123456``   
É possível alterar isso no objeto mockUser de LoginAPI

&nbsp;&nbsp;&nbsp;&nbsp;

### Observações
***

1 - O módulo para iOS não foi possível por conta do sistema em que o app foi desenvolvido. Sem um Mac, o módulo sequer pode ser testado  
2 - Existe uma imcompatibilidade entre a versão do react-native e a última versão do native-base, então foram necessários alguns ajustes.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A documentação do native-base recomenda a utilização do gluestack-ui (evolução da biblioteca)
