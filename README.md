# 🌿 Kumbustível do Saci

**Sistema de biocombustível sustentável com programa de pontos**

Um site responsivo e moderno para promover o uso de biocombustível sustentável, incluindo um sistema de pontos para recompensar clientes fiéis.

## 🚀 Funcionalidades

### 🏠 Página Principal (index.html)
- **Design responsivo** com menu hambúrguer para mobile
- **Hero section** com call-to-action atrativo
- **Seção de benefícios** destacando as vantagens do biocombustível
- **Formulário de contato** para potenciais parceiros
- **Esquema de cores consistente** em verde sustentável

### 📱 App de Pontos (pontos.html)
- **Sistema de pontos** baseado em litros abastecidos
- **Simulação de abastecimento** com animações
- **Conversão de pontos** em desconto (1 ponto = R$ 0,01)
- **Histórico de transações** com scroll personalizado
- **Design mobile-first** otimizado para smartphones

## 📁 Estrutura do Projeto

```
biofuel-points-system/
├── assets/
│   ├── css/
│   │   ├── variables.css    # Variáveis de cores e tema
│   │   ├── style.css        # Estilos da página inicial
│   │   └── pontos.css       # Estilos do app de pontos
│   ├── js/
│   │   └── pontos.js        # JavaScript do app de pontos
│   └── images/
│       ├── logo-com-escrita.png           # Logo com texto
│       ├── logo-pequena-convertido-de-png.svg  # Logo pequeno SVG
│       └── README.md        # Instruções para imagens
├── index.html               # Página inicial
├── pontos.html              # App de pontos
└── README.md                # Este arquivo
```

## 🎨 Design System

### Cores Principais
- **Verde Primário**: `#27ae60` - Cor principal da marca
- **Verde Claro**: `#2ecc71` - Destaques e hover
- **Verde Escuro**: `#229954` - Elementos de contraste

### Cores Secundárias
- **Amarelo**: `#f39c12` - Pontos e recompensas
- **Azul**: `#3498db` - Informações
- **Vermelho**: `#e74c3c` - Alertas

### Tipografia
- **Fonte Principal**: `Poppins` (página inicial)
- **Fonte Secundária**: `Inter` (app de pontos)
- **Pesos**: 300, 400, 500, 600, 700

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- **Mobile**: até 576px
- **Tablet**: 577px - 768px
- **Desktop**: 769px+

### Funcionalidades Mobile
- Menu hambúrguer animado
- Layout otimizado para toque
- Formulários mobile-friendly
- Animações suaves

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilização avançada com variáveis CSS
- **JavaScript Vanilla**: Interatividade sem dependências
- **Bootstrap 5**: Componentes específicos (modal, toast)
- **Google Fonts**: Tipografia personalizada

## 🚀 Como Usar

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd biofuel-points-system
   ```

2. **Abra o projeto**
   - Abra `index.html` em um navegador moderno
   - Ou use um servidor local como Live Server no VS Code

3. **Navegação**
   - Página inicial: `index.html`
   - App de pontos: `pontos.html`

## ✨ Funcionalidades do App de Pontos

### Sistema de Pontos
- **1 litro = 10 pontos**
- **100 pontos = R$ 1,00 de desconto**
- **Simulação aleatória** de abastecimento (10-80 litros)

### Animações
- **Animação de abastecimento** com gotas de biocombustível
- **Feedback visual** para ações do usuário
- **Transições suaves** entre estados

### Persistência
- **LocalStorage** para manter dados entre sessões
- **Histórico completo** de transações
- **Progresso salvo** automaticamente

## 🌱 Tema Sustentável

O projeto incorpora elementos visuais que reforçam o tema de sustentabilidade:
- **Cores verdes** representando natureza
- **Ícones de folhas** simbolizando crescimento
- **Gradientes naturais** criando harmonia visual
- **Animações orgânicas** simulando elementos naturais

## 🔧 Personalização

### Modificar Cores
Edite o arquivo `assets/css/variables.css` para alterar o esquema de cores:

```css
:root {
    --primary-color: #27ae60;    /* Cor principal */
    --secondary-color: #f39c12;  /* Cor secundária */
    /* ... outras variáveis */
}
```

### Adicionar Funcionalidades
- **JavaScript**: Edite `assets/js/pontos.js`
- **Estilos**: Modifique os arquivos CSS em `assets/css/`
- **Conteúdo**: Atualize os arquivos HTML

## 📈 Melhorias Futuras

- [ ] Sistema de autenticação de usuários
- [ ] Integração com API de pagamento
- [ ] Geolocalização para postos próximos
- [ ] Notificações push para ofertas
- [ ] Dashboard administrativo
- [ ] Modo escuro
- [ ] Internacionalização (i18n)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

**Kumbustível do Saci**  
📍 Pato Branco, Paraná, Brasil  
🌐 Acelere para um amanhã sustentável!

---

<div align="center">
  <strong>🌿 Desenvolvido com sustentabilidade em mente 🌿</strong>
</div>
