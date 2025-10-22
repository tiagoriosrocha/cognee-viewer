#!/bin/bash

# Script para criar um novo projeto Vue.js com template completo
# Este script automatiza a criação de um projeto baseado no template desenvolvido

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Vue.js Project Template Setup  ${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Verificar se o Vue CLI está instalado
check_vue_cli() {
    if ! command -v vue &> /dev/null; then
        print_error "Vue CLI não está instalado!"
        print_message "Instalando Vue CLI globalmente..."
        npm install -g @vue/cli
    else
        print_message "Vue CLI encontrado!"
    fi
}

# Verificar se o Node.js está instalado
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js não está instalado!"
        print_message "Por favor, instale o Node.js (versão 16 ou superior) em: https://nodejs.org/"
        exit 1
    else
        print_message "Node.js encontrado: $(node --version)"
    fi
}

# Criar o projeto
create_project() {
    local project_name=$1

    print_message "Criando projeto Vue.js: $project_name"

    # Criar projeto com Vue CLI
    vue create $project_name --default

    cd $project_name

    print_message "Projeto criado com sucesso!"
}

# Instalar dependências adicionais
install_dependencies() {
    print_message "Instalando dependências adicionais..."

    # Instalar Vue Router
    npm install vue-router@4

    # Instalar Vuetify
    npm install vuetify@3

    # Instalar MDI Icons
    npm install @mdi/font

    # Instalar v-network-graph
    npm install v-network-graph

    # Instalar D3 (dependência do v-network-graph)
    npm install d3-force

    # Instalar WebFontLoader
    npm install webfontloader

    print_message "Dependências instaladas com sucesso!"
}

# Criar estrutura de pastas
create_folder_structure() {
    print_message "Criando estrutura de pastas..."

    mkdir -p src/components/layout
    mkdir -p src/views
    mkdir -p src/layouts
    mkdir -p src/router
    mkdir -p src/composables
    mkdir -p src/config
    mkdir -p src/plugins

    print_message "Estrutura de pastas criada!"
}

# Copiar arquivos do template
copy_template_files() {
    print_message "Copiando arquivos do template..."

    # Aqui você pode adicionar comandos para copiar os arquivos do template
    # Por enquanto, vamos apenas criar os arquivos básicos

    print_warning "Arquivos do template precisam ser copiados manualmente"
    print_message "Consulte o arquivo vue-project-template.md para os arquivos completos"
}

# Configurar arquivos básicos
setup_basic_files() {
    print_message "Configurando arquivos básicos..."

    # Criar arquivo .env.example
    cat > .env.example << EOF
# Configurações de ambiente da aplicação
VUE_APP_API_BASE_URL=http://localhost:3000
VUE_APP_TITLE=Meu Projeto Vue
VUE_APP_VERSION=1.0.0
NODE_ENV=development
EOF

    # Criar arquivo .gitignore se não existir
    if [ ! -f .gitignore ]; then
        cat > .gitignore << EOF
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
EOF
    fi

    print_message "Arquivos básicos configurados!"
}

# Instalar dependências de desenvolvimento
install_dev_dependencies() {
    print_message "Instalando dependências de desenvolvimento..."

    # Instalar Prettier
    npm install --save-dev prettier

    # Instalar ESLint (se não estiver instalado)
    if ! npm list eslint &> /dev/null; then
        npm install --save-dev eslint
    fi

    print_message "Dependências de desenvolvimento instaladas!"
}

# Configurar scripts do package.json
configure_scripts() {
    print_message "Configurando scripts do package.json..."

    # Adicionar script de formatação
    npm pkg set scripts.format="prettier --write ."
    npm pkg set scripts.format:check="prettier --check ."

    print_message "Scripts configurados!"
}

# Mostrar instruções finais
show_final_instructions() {
    local project_name=$1

    echo ""
    print_header
    print_message "Projeto criado com sucesso!"
    echo ""
    print_message "Para começar:"
    echo "  cd $project_name"
    echo "  npm run serve"
    echo ""
    print_message "Para instalar o template completo:"
    echo "  1. Copie os arquivos do vue-project-template.md"
    echo "  2. Substitua os arquivos correspondentes no projeto"
    echo "  3. Execute: npm run serve"
    echo ""
    print_message "Estrutura recomendada:"
    echo "  src/"
    echo "  ├── components/layout/"
    echo "  ├── views/"
    echo "  ├── layouts/"
    echo "  ├── router/"
    echo "  ├── composables/"
    echo "  ├── config/"
    echo "  └── plugins/"
    echo ""
    print_message "Documentação completa disponível em: vue-project-template.md"
    echo ""
}

# Função principal
main() {
    print_header

    # Verificar argumentos
    if [ $# -eq 0 ]; then
        print_error "Uso: $0 <nome-do-projeto>"
        print_message "Exemplo: $0 meu-projeto-vue"
        exit 1
    fi

    local project_name=$1

    # Verificações iniciais
    check_node
    check_vue_cli

    # Criar projeto
    create_project $project_name

    # Instalar dependências
    install_dependencies
    install_dev_dependencies

    # Configurar estrutura
    create_folder_structure
    setup_basic_files
    configure_scripts

    # Mostrar instruções finais
    show_final_instructions $project_name
}

# Executar função principal
main "$@"
