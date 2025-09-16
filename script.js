// Qualcore - Sistema de Loja de Hardware com Compatibilidade
// Desenvolvido para mobile-first com funcionalidades completas

class QualcoreStore {
    constructor() {
        this.products = [];
        this.cart = [];
        this.buildComponents = {
            motherboard: null,
            cpu: null,
            ram: [],
            gpu: null,
            storage: [],
            psu: null,
            case: null,
            monitor: null,
            cooler: null
        };
        this.isBuildMode = false;
        this.currentCategory = 'all';
        this.currentSort = 'name';
        this.isDarkMode = false;
        
        this.init();
    }

    init() {
        this.initializeProducts();
        this.setupEventListeners();
        this.loadUserPreferences();
        this.renderProducts();
        this.updateUI();
    }

    // ==================== DADOS DOS PRODUTOS ====================
    initializeProducts() {
        this.products = [
            // PLACAS-MÃE
            {
                id: 'mb-asus-b550',
                name: 'ASUS ROG Strix B550-F Gaming',
                description: 'Placa-mãe gaming ATX com suporte AMD AM4, DDR4, PCIe 4.0, WiFi 6',
                price: 899.99,
                image: 'https://img.terabyteshop.com.br/produto/g/placa-mae-asus-rog-strix-b550-f-gaming-wi-fi-ii-chipset-b550-amd-am4-atx-ddr4-90mb19v0-m0eay0_199228.jpg',
                category: 'motherboard',
                brand: 'ASUS',
                specs: {
                    socket: 'AM4',
                    ramType: 'DDR4',
                    ramSlots: 4,
                    maxRam: 128,
                    pciSlots: 2,
                    storageSlots: 6,
                    formFactor: 'ATX'
                },
                inStock: true
            },
            {
                id: 'mb-msi-b660',
                name: 'MSI MAG B660M Mortar WiFi',
                description: 'Placa-mãe micro-ATX Intel LGA1700, DDR4, WiFi 6, RGB Mystic Light',
                price: 699.99,
                image: 'https://m.media-amazon.com/images/I/81G9dEjfZdL._UF894,1000_QL80_.jpg',
                category: 'motherboard',
                brand: 'MSI',
                specs: {
                    socket: 'LGA1700',
                    ramType: 'DDR4',
                    ramSlots: 4,
                    maxRam: 128,
                    pciSlots: 1,
                    storageSlots: 4,
                    formFactor: 'mATX'
                },
                inStock: true
            },
            {
                id: 'mb-gigabyte-x570',
                name: 'Gigabyte X570 AORUS Elite',
                description: 'Placa-mãe ATX premium AMD AM4, DDR4, PCIe 4.0, RGB Fusion 2.0',
                price: 1199.99,
                image: 'https://m.media-amazon.com/images/I/71hktnx-KvL.jpg',
                category: 'motherboard',
                brand: 'Gigabyte',
                specs: {
                    socket: 'AM4',
                    ramType: 'DDR4',
                    ramSlots: 4,
                    maxRam: 128,
                    pciSlots: 2,
                    storageSlots: 8,
                    formFactor: 'ATX'
                },
                inStock: true
            },

            // PROCESSADORES
            {
                id: 'cpu-amd-5600x',
                name: 'AMD Ryzen 5 5600X',
                description: 'Processador 6-core/12-thread, 3.7GHz base, 4.6GHz boost, AM4',
                price: 1199.99,
                image: 'https://images1.kabum.com.br/produtos/fotos/129451/processador-amd-ryzen-9-5950x-cache-72mb-3-4ghz-4-9ghz-max-turbo-am4-100-100000065box_1602603581_gg.jpg',
                category: 'cpu',
                brand: 'AMD',
                specs: {
                    socket: 'AM4',
                    cores: 6,
                    threads: 12,
                    baseClock: 3.7,
                    boostClock: 4.6,
                    tdp: 65,
                    architecture: 'Zen 3'
                },
                inStock: true
            },
            {
                id: 'cpu-intel-12600k',
                name: 'Intel Core i5-12600K',
                description: 'Processador 10-core (6P+4E), 3.7GHz base, 4.9GHz boost, LGA1700',
                price: 1399.99,
                image: 'https://images.kabum.com.br/produtos/fotos/sync_mirakl/277256/xlarge/Processador-Intel-Core-I5-12600K-3-7GHz-4-9GHz-Turbo-Cache-20MB-10-N-cleos-16-Threads-LGA-1700-Bx8071512600k_1756303487.jpg',
                category: 'cpu',
                brand: 'Intel',
                specs: {
                    socket: 'LGA1700',
                    cores: 10,
                    threads: 16,
                    baseClock: 3.7,
                    boostClock: 4.9,
                    tdp: 125,
                    architecture: 'Alder Lake'
                },
                inStock: true
            },
            {
                id: 'cpu-amd-7800x3d',
                name: 'AMD Ryzen 7 7800X3D',
                description: 'Processador 8-core/16-thread com 3D V-Cache, ideal para gaming, AM5',
                price: 2299.99,
                image: 'https://images.tcdn.com.br/img/img_prod/591628/processador_amd_ryzen_7_7800x3d_socket_am5_4_2ghz_5_0ghz_cache_104mb_100_100000910wof_36063_1_648e3ed88573842a8c3470a5bb960f44.jpg',
                category: 'cpu',
                brand: 'AMD',
                specs: {
                    socket: 'AM5',
                    cores: 8,
                    threads: 16,
                    baseClock: 4.2,
                    boostClock: 5.0,
                    tdp: 120,
                    architecture: 'Zen 4'
                },
                inStock: true
            },

            // MEMÓRIAS RAM
            {
                id: 'ram-corsair-ddr4-16gb',
                name: 'Corsair Vengeance LPX 16GB DDR4-3200',
                description: 'Memória RAM DDR4 3200MHz, 2x8GB, CL16, Low Profile',
                price: 299.99,
                image: 'https://img.terabyteshop.com.br/produto/g/memoria-ddr4-corsair-vengeance-lpx-16gb-2x8gb-3200mhz-cmk16gx4m2b3200c16_85786.png',
                category: 'ram',
                brand: 'Corsair',
                specs: {
                    ramType: 'DDR4',
                    capacity: 16,
                    speed: 3200,
                    latency: 'CL16',
                    modules: 2,
                    voltage: 1.35
                },
                inStock: true
            },
            {
                id: 'ram-kingston-ddr3-8gb',
                name: 'Kingston Fury Beast 8GB DDR3-1600',
                description: 'Memória RAM DDR3 1600MHz, 8GB, CL10 (Compatível com sistemas legados)',
                price: 149.99,
                image: 'https://www.kingstonstore.com.br/cdn/shop/products/DDR4FBK11_f80e115e-f13c-487b-bb82-ffa562b9ef2b.jpg?v=1627418620&width=1920',
                category: 'ram',
                brand: 'Kingston',
                specs: {
                    ramType: 'DDR3',
                    capacity: 8,
                    speed: 1600,
                    latency: 'CL10',
                    modules: 1,
                    voltage: 1.5
                },
                inStock: true
            },
            {
                id: 'ram-gskill-ddr5-32gb',
                name: 'G.Skill Trident Z5 RGB 32GB DDR5-6000',
                description: 'Memória RAM DDR5 6000MHz, 2x16GB, CL36, RGB, Para AMD/Intel mais recentes',
                price: 899.99,
                image: 'https://m.media-amazon.com/images/I/71DiVTefKBL.jpg',
                category: 'ram',
                brand: 'G.Skill',
                specs: {
                    ramType: 'DDR5',
                    capacity: 32,
                    speed: 6000,
                    latency: 'CL36',
                    modules: 2,
                    voltage: 1.35
                },
                inStock: true
            },

            // PLACAS DE VÍDEO
            {
                id: 'gpu-rtx-4070ti',
                name: 'NVIDIA GeForce RTX 4070 Ti Gaming TrioX',
                description: 'Placa de vídeo high-end, 12GB GDDR6X, Ray Tracing, DLSS 3.0',
                price: 3299.99,
                image: 'https://br.octoshop.com/cdn/shop/files/RTX4070Ti-TRIO-12G_0.jpg?v=1739307409',
                category: 'gpu',
                brand: 'NVIDIA/MSI',
                specs: {
                    memory: 12,
                    memoryType: 'GDDR6X',
                    coreClock: 2310,
                    boostClock: 2610,
                    powerConsumption: 285,
                    recommendedPSU: 700,
                    outputs: ['HDMI 2.1', 'DisplayPort 1.4a']
                },
                inStock: true
            },
            {
                id: 'gpu-rx-7600xt',
                name: 'AMD Radeon RX 7600 XT',
                description: 'Placa de vídeo 1440p gaming, 16GB GDDR6, Ray Tracing, FSR 3.0',
                price: 2499.99,
                image: 'https://www.kabum.com.br/_next/image?url=https%3A%2F%2Fimages1.kabum.com.br%2Fprodutos%2Ffotos%2F529101%2Fplaca-de-video-rx-7600-xt-asus-amd-radeon-dual-o16g-16gb-gddr6-90yv0k21-m0na00_1713956735_gg.jpg&w=640&q=75',
                category: 'gpu',
                brand: 'AMD',
                specs: {
                    memory: 16,
                    memoryType: 'GDDR6',
                    coreClock: 1900,
                    boostClock: 2755,
                    powerConsumption: 190,
                    recommendedPSU: 600,
                    outputs: ['HDMI 2.1', 'DisplayPort 2.1']
                },
                inStock: true
            },
            {
                id: 'gpu-rtx-4090',
                name: 'NVIDIA GeForce RTX 4090',
                description: 'Placa de vídeo flagship, 24GB GDDR6X, 4K gaming, criação de conteúdo',
                price: 8999.99,
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/NVIDIA_RTX_4090_Founders_Edition_-_Verpackung_%28ZMASLO%29.png/2560px-NVIDIA_RTX_4090_Founders_Edition_-_Verpackung_%28ZMASLO%29.png',
                category: 'gpu',
                brand: 'NVIDIA',
                specs: {
                    memory: 24,
                    memoryType: 'GDDR6X',
                    coreClock: 2230,
                    boostClock: 2520,
                    powerConsumption: 450,
                    recommendedPSU: 850,
                    outputs: ['HDMI 2.1', 'DisplayPort 1.4a']
                },
                inStock: true
            },

            // ARMAZENAMENTO
            {
                id: 'ssd-samsung-980pro-1tb',
                name: 'Samsung 980 PRO 1TB NVMe',
                description: 'SSD NVMe PCIe 4.0, 7000MB/s leitura, ideal para gaming e workstations',
                price: 499.99,
                image: 'https://m.media-amazon.com/images/I/812DsfxDSVL.jpg', 
                category: 'storage',
                brand: 'Samsung',
                specs: {
                    type: 'NVMe SSD',
                    capacity: 1000,
                    interface: 'PCIe 4.0',
                    readSpeed: 7000,
                    writeSpeed: 5000,
                    formFactor: 'M.2 2280'
                },
                inStock: true
            },
            {
                id: 'hdd-wd-black-2tb',
                name: 'WD Black 2TB HDD',
                description: 'HD mecânico 7200RPM, 2TB, para armazenamento em massa e backup',
                price: 349.99,
                image: 'https://m.media-amazon.com/images/I/713qJ+n3VUL.jpg', 
                category: 'storage',
                brand: 'WD',
                specs: {
                    type: 'HDD',
                    capacity: 2000,
                    interface: 'SATA III',
                    rpm: 7200,
                    cache: 64,
                    formFactor: '3.5"'
                },
                inStock: true
            },

            // FONTES
            {
                id: 'psu-corsair-rm850x',
                name: 'Corsair RM850x 850W 80+ Gold',
                description: 'Fonte modular 850W, certificação 80+ Gold, silenciosa, 10 anos garantia',
                price: 699.99,
                image: 'https://m.media-amazon.com/images/I/81OwObzrzLL.jpg', 
                category: 'psu',
                brand: 'Corsair',
                specs: {
                    wattage: 850,
                    efficiency: '80+ Gold',
                    modular: true,
                    fanSize: 135,
                    warranty: 10,
                    cables: 'Sleeved'
                },
                inStock: true
            },
            {
                id: 'psu-seasonic-focus-650w',
                name: 'Seasonic Focus GX-650 650W 80+ Gold',
                description: 'Fonte semi-modular 650W, 80+ Gold, ventilador híbrido, 10 anos garantia',
                price: 549.99,
                image: 'https://m.media-amazon.com/images/I/51wOpEuo7rL._UF1000,1000_QL80_.jpg', 
                category: 'psu',
                brand: 'Seasonic',
                specs: {
                    wattage: 650,
                    efficiency: '80+ Gold',
                    modular: false,
                    fanSize: 120,
                    warranty: 10,
                    cables: 'Standard'
                },
                inStock: true
            },

            // GABINETES
            {
                id: 'case-nzxt-h510',
                name: 'NZXT H510 Mid Tower',
                description: 'Gabinete mid-tower, painel lateral de vidro, excelente fluxo de ar',
                price: 399.99,
                image: 'https://images2.kabum.com.br/produtos/fotos/110022/gabinete-gamer-nzxt-h510-elite-mid-tower-rgb-com-fan-lateral-e-frontal-em-vidro-branco-ca-h510e-w1_1581539235_gg.jpg',
                category: 'case',
                brand: 'NZXT',
                specs: {
                    type: 'Mid Tower',
                    motherboardSupport: ['ATX', 'mATX', 'Mini-ITX'],
                    maxGpuLength: 381,
                    maxCpuCoolerHeight: 165,
                    frontPorts: ['USB 3.1', 'USB-C', '3.5mm'],
                    includedFans: 2
                },
                inStock: true
            },
            {
                id: 'case-corsair-4000d',
                name: 'Corsair 4000D Airflow',
                description: 'Gabinete mid-tower com foco em airflow, suporte para radiadores 360mm',
                price: 499.99,
                image: 'https://m.media-amazon.com/images/I/81BJl9d8iHL.jpg',
                category: 'case',
                brand: 'Corsair',
                specs: {
                    type: 'Mid Tower',
                    motherboardSupport: ['ATX', 'mATX', 'Mini-ITX'],
                    maxGpuLength: 360,
                    maxCpuCoolerHeight: 170,
                    frontPorts: ['USB 3.0', 'USB-C', '3.5mm'],
                    includedFans: 2
                },
                inStock: true
            },

            // MONITORES
            {
                id: 'monitor-lg-27gp850',
                name: 'LG 27GP850-B 27" 1440p 165Hz',
                description: 'Monitor gamer IPS 27", 2560x1440, 165Hz, 1ms, G-Sync Compatible',
                price: 1299.99,
                image: 'https://nissei.com/media/wysiwyg/mnt-27gp850-08-1-stylish-desgn-d.jpg',
                category: 'monitor',
                brand: 'LG',
                specs: {
                    size: 27,
                    resolution: '2560x1440',
                    refreshRate: 165,
                    responseTime: 1,
                    panelType: 'IPS',
                    features: ['G-Sync Compatible', 'FreeSync', 'HDR10']
                },
                inStock: true
            },
            {
                id: 'monitor-asus-pg279qm',
                name: 'ASUS ROG Swift PG279QM 27" 1440p 240Hz',
                description: 'Monitor gamer premium IPS 27", 2560x1440, 240Hz, G-Sync Ultimate',
                price: 2499.99,
                image: 'https://plecom.imgix.net/iit-398638-668901.png?fit=fillmax&fill=solid&fill-color=ffffff&auto=format&w=1000&h=1000',
                category: 'monitor',
                brand: 'ASUS',
                specs: {
                    size: 27,
                    resolution: '2560x1440',
                    refreshRate: 240,
                    responseTime: 1,
                    panelType: 'Fast IPS',
                    features: ['G-Sync Ultimate', 'HDR600', 'ELMB-Sync']
                },
                inStock: true
            },

            // COOLERS
            {
                id: 'cooler-noctua-nhd15',
                name: 'Noctua NH-D15 Dual Tower',
                description: 'Cooler a ar premium dual-tower, 2 ventiladores, compatível AM4/LGA1700',
                price: 399.99,
                image: 'https://m.media-amazon.com/images/I/91t48GBv8TL.jpg',
                category: 'cooler',
                brand: 'Noctua',
                specs: {
                    type: 'Air Cooler',
                    height: 165,
                    compatibility: ['AM4', 'AM5', 'LGA1700', 'LGA1200'],
                    fans: 2,
                    tdpRating: 250,
                    noise: 24.6
                },
                inStock: true
            },
            {
                id: 'cooler-corsair-h100i',
                name: 'Corsair H100i RGB PLATINUM SE',
                description: 'Water cooler AIO 240mm, RGB, software iCUE, radiador branco',
                price: 699.99,
                image: 'https://images.kabum.com.br/produtos/fotos/103357/water-cooler-corsair-h100i-rgb-platinum-se-hydro-series-240mm-rgb-branco-cw-9060042-ww-_water-cooler-corsair-h100i-rgb-platinum-se-hydro-series-240mm-rgb-branco-cw-9060042-ww-_1566333582_gg.jpg',
                category: 'cooler',
                brand: 'Corsair',
                specs: {
                    type: 'AIO Liquid',
                    radiatorSize: 240,
                    compatibility: ['AM4', 'AM5', 'LGA1700', 'LGA1200'],
                    fans: 2,
                    tdpRating: 250,
                    rgb: true
                },
                inStock: true
            }
        ];
    }

    // ==================== EVENT LISTENERS ====================
    setupEventListeners() {
        // Menu e navegação
        document.getElementById('menuToggle').addEventListener('click', () => this.toggleSidebar());
        document.getElementById('sidebarClose').addEventListener('click', () => this.closeSidebar());
        document.getElementById('overlay').addEventListener('click', () => this.closeSidebar());

        // Tema (sidebar e mobile)
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('themeToggleMobile').addEventListener('click', () => this.toggleTheme());

        // Pesquisa
        document.getElementById('searchInput').addEventListener('input', (e) => this.handleSearch(e.target.value));
        document.getElementById('searchBtn').addEventListener('click', () => this.handleSearch());

        // Modo build
        document.getElementById('buildModeBtn').addEventListener('click', () => this.toggleBuildMode());
        document.getElementById('buildModeClose').addEventListener('click', () => this.toggleBuildMode(false));

        // Carrinho
        document.getElementById('cartBtn').addEventListener('click', () => this.openCartModal());
        document.getElementById('cartModalClose').addEventListener('click', () => this.closeModal('cartModal'));

        // Modais
        document.getElementById('productModalClose').addEventListener('click', () => this.closeModal('productModal'));

        // Navegação por categoria (sidebar)
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const category = item.dataset.category;
                this.setCategory(category);
                this.closeSidebar();
            });
        });

        // Tabs de categoria
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                this.setCategory(category);
            });
        });

        // Ordenação
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderProducts();
        });

        // Checkout
        document.getElementById('checkoutBtn').addEventListener('click', () => this.handleCheckout());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
    }

    // ==================== UI MANAGEMENT ====================
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Prevent body scroll when sidebar is open
        if (sidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeSidebar() {
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
        document.body.style.overflow = '';
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
        
        // Update sidebar theme button
        const themeIcon = document.querySelector('#themeToggle i');
        const themeText = document.querySelector('.theme-text');
        
        // Update mobile theme button
        const mobileThemeIcon = document.querySelector('#themeToggleMobile i');
        
        if (this.isDarkMode) {
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Light Mode';
            mobileThemeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Dark Mode';
            mobileThemeIcon.className = 'fas fa-moon';
        }
        
        this.saveUserPreferences();
    }

    toggleBuildMode(force = null) {
        this.isBuildMode = force !== null ? force : !this.isBuildMode;
        
        const banner = document.getElementById('buildModeBanner');
        const buildBtn = document.getElementById('buildModeBtn');
        
        if (this.isBuildMode) {
            banner.style.display = 'block';
            buildBtn.classList.add('active');
        } else {
            banner.style.display = 'none';
            buildBtn.classList.remove('active');
            this.clearBuild();
        }
        
        this.renderProducts();
        this.updateBuildCounter();
    }

    setCategory(category) {
        this.currentCategory = category;
        
        // Update active states
        document.querySelectorAll('.nav-item, .tab-btn').forEach(item => {
            item.classList.remove('active');
        });
        
        document.querySelectorAll(`[data-category="${category}"]`).forEach(item => {
            item.classList.add('active');
        });
        
        this.renderProducts();
    }

    updateUI() {
        this.updateCartCounter();
        this.updateBuildCounter();
    }

    updateCartCounter() {
        const counter = document.getElementById('cartCounter');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        counter.textContent = totalItems;
        counter.classList.toggle('active', totalItems > 0);
    }

    updateBuildCounter() {
        const counter = document.getElementById('buildCounter');
        let totalComponents = 0;
        
        Object.values(this.buildComponents).forEach(component => {
            if (Array.isArray(component)) {
                totalComponents += component.length;
            } else if (component) {
                totalComponents += 1;
            }
        });
        
        counter.textContent = totalComponents;
        counter.classList.toggle('active', totalComponents > 0);
    }

    // ==================== PRODUCT RENDERING ====================
    renderProducts() {
        const grid = document.getElementById('productsGrid');
        const loading = document.getElementById('loading');
        
        // Show loading
        loading.style.display = 'flex';
        grid.innerHTML = '';
        
        // Filter products
        let filteredProducts = this.products;
        
        if (this.currentCategory !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === this.currentCategory);
        }
        
        // Sort products
        filteredProducts = this.sortProducts(filteredProducts);
        
        // Simulate loading delay
        setTimeout(() => {
            loading.style.display = 'none';
            
            if (filteredProducts.length === 0) {
                grid.innerHTML = `
                    <div class="no-products">
                        <i class="fas fa-box-open" style="font-size: 3rem; color: var(--accent-gray); margin-bottom: 1rem;"></i>
                        <h3>Nenhum produto encontrado</h3>
                        <p>Tente alterar os filtros ou categoria selecionada.</p>
                    </div>
                `;
                return;
            }
            
            filteredProducts.forEach(product => {
                const productCard = this.createProductCard(product);
                grid.appendChild(productCard);
            });
        }, 300);
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;
        
        // Check compatibility in build mode
        const compatibility = this.isBuildMode ? this.checkProductCompatibility(product) : { compatible: true, reasons: [] };
        
        if (!compatibility.compatible) {
            card.classList.add('incompatible');
        }
        
        // Check if product is in build
        const inBuild = this.isProductInBuild(product);
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            
            <div class="product-content">
                <div class="product-header">
                    <span class="product-category">${this.getCategoryName(product.category)}</span>
                    <span class="product-brand">${product.brand}</span>
                </div>
                
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                
                <div class="product-specs">
                    ${this.renderProductSpecs(product)}
                </div>
                
                ${!compatibility.compatible ? `
                    <div class="incompatibility-warning">
                        <div class="warning-title">
                            <i class="fas fa-exclamation-triangle"></i>
                            Incompatível:
                        </div>
                        <ul class="warning-reasons">
                            ${compatibility.reasons.map(reason => `<li>${reason}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                <div class="product-price">R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                
                <div class="product-actions">
                    ${this.isBuildMode ? `
                        ${inBuild ? `
                            <button class="btn btn-danger" onclick="qualcore.removeFromBuild('${product.id}', '${product.category}')">
                                <i class="fas fa-minus"></i>
                                Remover
                            </button>
                        ` : `
                            <button class="btn btn-primary" onclick="qualcore.addToBuild('${product.id}')" ${!compatibility.compatible ? 'disabled' : ''}>
                                <i class="fas fa-plus"></i>
                                Adicionar
                            </button>
                        `}
                        <button class="btn btn-secondary" onclick="qualcore.showProductDetails('${product.id}')">
                            <i class="fas fa-info-circle"></i>
                            Detalhes
                        </button>
                    ` : `
                        <button class="btn btn-primary" onclick="qualcore.addToCart('${product.id}')">
                            <i class="fas fa-shopping-cart"></i>
                            Comprar
                        </button>
                        <button class="btn btn-secondary" onclick="qualcore.showProductDetails('${product.id}')">
                            <i class="fas fa-info-circle"></i>
                            Detalhes
                        </button>
                    `}
                </div>
            </div>
        `;
        
        return card;
    }

    renderProductSpecs(product) {
        const specs = product.specs;
        let specsHtml = '';
        
        // Common specs for all categories
        const specMappings = {
            socket: 'Socket',
            ramType: 'Tipo RAM',
            ramSlots: 'Slots RAM',
            cores: 'Cores',
            threads: 'Threads',
            baseClock: 'Clock Base',
            boostClock: 'Clock Boost',
            tdp: 'TDP',
            capacity: 'Capacidade',
            speed: 'Velocidade',
            memory: 'Memória',
            powerConsumption: 'Consumo',
            wattage: 'Potência',
            size: 'Tamanho',
            refreshRate: 'Taxa Atualização'
        };
        
        // Show only most relevant specs for each category
        let relevantSpecs = [];
        
        switch (product.category) {
            case 'motherboard':
                relevantSpecs = ['socket', 'ramType', 'ramSlots'];
                break;
            case 'cpu':
                relevantSpecs = ['socket', 'cores', 'threads'];
                break;
            case 'ram':
                relevantSpecs = ['ramType', 'capacity', 'speed'];
                break;
            case 'gpu':
                relevantSpecs = ['memory', 'powerConsumption'];
                break;
            case 'storage':
                relevantSpecs = ['type', 'capacity'];
                break;
            case 'psu':
                relevantSpecs = ['wattage', 'efficiency'];
                break;
            case 'monitor':
                relevantSpecs = ['size', 'resolution', 'refreshRate'];
                break;
            case 'cooler':
                relevantSpecs = ['type', 'tdpRating'];
                break;
            default:
                relevantSpecs = Object.keys(specs).slice(0, 3);
        }
        
        relevantSpecs.forEach(key => {
            if (specs[key] !== undefined) {
                const label = specMappings[key] || key;
                let value = specs[key];
                
                // Format values based on type
                if (key === 'baseClock' || key === 'boostClock') {
                    value = `${value}GHz`;
                } else if (key === 'tdp' || key === 'powerConsumption') {
                    value = `${value}W`;
                } else if (key === 'capacity' && product.category === 'ram') {
                    value = `${value}GB`;
                } else if (key === 'capacity' && product.category === 'storage') {
                    value = `${value}GB`;
                } else if (key === 'speed' && product.category === 'ram') {
                    value = `${value}MHz`;
                } else if (key === 'memory') {
                    value = `${value}GB`;
                } else if (key === 'wattage') {
                    value = `${value}W`;
                } else if (key === 'size') {
                    value = `${value}"`;
                } else if (key === 'refreshRate') {
                    value = `${value}Hz`;
                } else if (key === 'tdpRating') {
                    value = `${value}W`;
                }
                
                specsHtml += `
                    <div class="spec-row">
                        <span class="spec-label">${label}:</span>
                        <span class="spec-value">${value}</span>
                    </div>
                `;
            }
        });
        
        return specsHtml;
    }

    // ==================== COMPATIBILITY SYSTEM ====================
    checkProductCompatibility(product) {
        const result = { compatible: true, reasons: [] };
        
        if (!this.isBuildMode) return result;
        
        const currentBuild = this.buildComponents;
        
        // Check CPU + Motherboard compatibility
        if (product.category === 'cpu' && currentBuild.motherboard) {
            const motherboard = this.getProductById(currentBuild.motherboard);
            if (motherboard && motherboard.specs.socket !== product.specs.socket) {
                result.compatible = false;
                result.reasons.push(`Socket ${product.specs.socket} incompatível com placa-mãe ${motherboard.specs.socket}`);
            }
        }
        
        if (product.category === 'motherboard' && currentBuild.cpu) {
            const cpu = this.getProductById(currentBuild.cpu);
            if (cpu && cpu.specs.socket !== product.specs.socket) {
                result.compatible = false;
                result.reasons.push(`Socket ${product.specs.socket} incompatível com CPU ${cpu.specs.socket}`);
            }
        }
        
        // Check RAM + Motherboard compatibility
        if (product.category === 'ram' && currentBuild.motherboard) {
            const motherboard = this.getProductById(currentBuild.motherboard);
            if (motherboard && motherboard.specs.ramType !== product.specs.ramType) {
                result.compatible = false;
                result.reasons.push(`RAM ${product.specs.ramType} incompatível com placa-mãe ${motherboard.specs.ramType}`);
            }
        }
        
        if (product.category === 'motherboard' && currentBuild.ram.length > 0) {
            const ram = this.getProductById(currentBuild.ram[0]);
            if (ram && ram.specs.ramType !== product.specs.ramType) {
                result.compatible = false;
                result.reasons.push(`Placa-mãe ${product.specs.ramType} incompatível com RAM ${ram.specs.ramType}`);
            }
        }
        
        // Check PSU + GPU compatibility
        if (product.category === 'gpu' && currentBuild.psu) {
            const psu = this.getProductById(currentBuild.psu);
            if (psu && psu.specs.wattage < product.specs.recommendedPSU) {
                result.compatible = false;
                result.reasons.push(`Fonte de ${psu.specs.wattage}W insuficiente (recomendado: ${product.specs.recommendedPSU}W)`);
            }
        }
        
        if (product.category === 'psu' && currentBuild.gpu) {
            const gpu = this.getProductById(currentBuild.gpu);
            if (gpu && product.specs.wattage < gpu.specs.recommendedPSU) {
                result.compatible = false;
                result.reasons.push(`Fonte de ${product.specs.wattage}W insuficiente para GPU (recomendado: ${gpu.specs.recommendedPSU}W)`);
            }
        }
        
        return result;
    }

    isProductInBuild(product) {
        const component = this.buildComponents[product.category];
        
        if (Array.isArray(component)) {
            return component.includes(product.id);
        } else {
            return component === product.id;
        }
    }

    // ==================== BUILD MANAGEMENT ====================
    addToBuild(productId) {
        const product = this.getProductById(productId);
        if (!product) return;
        
        const category = product.category;
        const component = this.buildComponents[category];
        
        // Handle array categories (RAM, Storage)
        if (Array.isArray(component)) {
            if (!component.includes(productId)) {
                component.push(productId);
                this.showToast('success', 'Adicionado ao Build', `${product.name} foi adicionado ao seu build.`);
            }
        } else {
            // Handle single component categories
            if (this.buildComponents[category] !== productId) {
                this.buildComponents[category] = productId;
                this.showToast('success', 'Adicionado ao Build', `${product.name} foi adicionado ao seu build.`);
            }
        }
        
        this.updateBuildCounter();
        this.renderProducts(); // Re-render to update compatibility
    }

    removeFromBuild(productId, category) {
        const product = this.getProductById(productId);
        if (!product) return;
        
        const component = this.buildComponents[category];
        
        // Handle array categories
        if (Array.isArray(component)) {
            const index = component.indexOf(productId);
            if (index > -1) {
                component.splice(index, 1);
                this.showToast('info', 'Removido do Build', `${product.name} foi removido do seu build.`);
            }
        } else {
            // Handle single component categories
            if (this.buildComponents[category] === productId) {
                this.buildComponents[category] = null;
                this.showToast('info', 'Removido do Build', `${product.name} foi removido do seu build.`);
            }
        }
        
        this.updateBuildCounter();
        this.renderProducts(); // Re-render to update compatibility
    }

    clearBuild() {
        this.buildComponents = {
            motherboard: null,
            cpu: null,
            ram: [],
            gpu: null,
            storage: [],
            psu: null,
            case: null,
            monitor: null,
            cooler: null
        };
        this.updateBuildCounter();
    }

    // ==================== CART MANAGEMENT ====================
    addToCart(productId, quantity = 1) {
        const product = this.getProductById(productId);
        if (!product) return;
        
        const existingItem = this.cart.find(item => item.productId === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                productId: productId,
                quantity: quantity,
                addedAt: new Date()
            });
        }
        
        this.updateCartCounter();
        this.showToast('success', 'Produto Adicionado', `${product.name} foi adicionado ao carrinho.`);
    }

    removeFromCart(productId) {
        const product = this.getProductById(productId);
        this.cart = this.cart.filter(item => item.productId !== productId);
        this.updateCartCounter();
        this.renderCartModal();
        
        if (product) {
            this.showToast('info', 'Produto Removido', `${product.name} foi removido do carrinho.`);
        }
    }

    updateCartQuantity(productId, quantity) {
        const item = this.cart.find(item => item.productId === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.updateCartCounter();
                this.renderCartModal();
            }
        }
    }

    clearCart() {
        this.cart = [];
        this.updateCartCounter();
        this.renderCartModal();
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => {
            const product = this.getProductById(item.productId);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    }

    // ==================== MODAL MANAGEMENT ====================
    openCartModal() {
        this.renderCartModal();
        document.getElementById('cartModal').classList.add('active');
    }

    renderCartModal() {
        const content = document.getElementById('cartModalContent');
        const total = document.getElementById('cartTotal');
        
        if (this.cart.length === 0) {
            content.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart" style="font-size: 3rem; color: var(--accent-gray); margin-bottom: 1rem;"></i>
                    <h3>Carrinho Vazio</h3>
                    <p>Adicione produtos ao seu carrinho para continuar.</p>
                </div>
            `;
            total.textContent = 'Total: R$ 0,00';
            return;
        }
        
        content.innerHTML = this.cart.map(item => {
            const product = this.getProductById(item.productId);
            if (!product) return '';
            
            return `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${product.name}</div>
                        <div class="cart-item-price">R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                        <div class="cart-item-controls">
                            <button class="quantity-btn" onclick="qualcore.updateCartQuantity('${product.id}', ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="qualcore.updateCartQuantity('${product.id}', ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button class="remove-btn" onclick="qualcore.removeFromCart('${product.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        total.textContent = `Total: R$ ${this.getCartTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    }

    showProductDetails(productId) {
        const product = this.getProductById(productId);
        if (!product) return;
        
        const title = document.getElementById('productModalTitle');
        const content = document.getElementById('productModalContent');
        
        title.textContent = product.name;
        
        content.innerHTML = `
            <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
                <img src="${product.image}" alt="${product.name}" style="width: 300px; max-width: 100%; height: 200px; object-fit: cover; border-radius: var(--border-radius);">
                <div style="flex: 1; min-width: 250px;">
                    <div style="margin-bottom: 1rem;">
                        <span style="background: var(--primary-purple); color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase;">${this.getCategoryName(product.category)}</span>
                        <span style="margin-left: 1rem; color: var(--text-secondary); font-weight: 500;">${product.brand}</span>
                    </div>
                    <p style="color: var(--text-secondary); margin-bottom: 1rem; line-height: 1.6;">${product.description}</p>
                    <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary-purple); margin-bottom: 1rem;">
                        R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button class="btn btn-primary" onclick="qualcore.addToCart('${product.id}'); qualcore.closeModal('productModal')">
                            <i class="fas fa-shopping-cart"></i>
                            Adicionar ao Carrinho
                        </button>
                        ${this.isBuildMode ? `
                            <button class="btn btn-secondary" onclick="qualcore.addToBuild('${product.id}'); qualcore.closeModal('productModal')">
                                <i class="fas fa-tools"></i>
                                Adicionar ao Build
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 2rem;">
                <h4 style="margin-bottom: 1rem; color: var(--text-primary);">Especificações Técnicas</h4>
                <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: var(--border-radius);">
                    ${this.renderDetailedSpecs(product)}
                </div>
            </div>
        `;
        
        document.getElementById('productModal').classList.add('active');
    }

    renderDetailedSpecs(product) {
        const specs = product.specs;
        let specsHtml = '';
        
        const specMappings = {
            socket: 'Socket',
            ramType: 'Tipo de RAM',
            ramSlots: 'Slots de RAM',
            maxRam: 'RAM Máxima',
            pciSlots: 'Slots PCIe',
            storageSlots: 'Conectores SATA',
            formFactor: 'Formato',
            cores: 'Núcleos',
            threads: 'Threads',
            baseClock: 'Clock Base',
            boostClock: 'Clock Boost',
            tdp: 'TDP',
            architecture: 'Arquitetura',
            capacity: 'Capacidade',
            speed: 'Velocidade',
            latency: 'Latência',
            modules: 'Módulos',
            voltage: 'Voltagem',
            memory: 'Memória',
            memoryType: 'Tipo de Memória',
            coreClock: 'Clock do Core',
            powerConsumption: 'Consumo',
            recommendedPSU: 'Fonte Recomendada',
            outputs: 'Saídas',
            type: 'Tipo',
            interface: 'Interface',
            readSpeed: 'Velocidade de Leitura',
            writeSpeed: 'Velocidade de Escrita',
            rpm: 'RPM',
            cache: 'Cache',
            wattage: 'Potência',
            efficiency: 'Eficiência',
            modular: 'Modular',
            fanSize: 'Tamanho do Ventilador',
            warranty: 'Garantia',
            cables: 'Cabos',
            motherboardSupport: 'Suporte a Placas-mãe',
            maxGpuLength: 'Comprimento Max GPU',
            maxCpuCoolerHeight: 'Altura Max Cooler',
            frontPorts: 'Portas Frontais',
            includedFans: 'Ventiladores Inclusos',
            size: 'Tamanho',
            resolution: 'Resolução',
            refreshRate: 'Taxa de Atualização',
            responseTime: 'Tempo de Resposta',
            panelType: 'Tipo de Painel',
            features: 'Recursos',
            height: 'Altura',
            compatibility: 'Compatibilidade',
            fans: 'Ventiladores',
            tdpRating: 'TDP Suportado',
            noise: 'Ruído',
            radiatorSize: 'Tamanho do Radiador',
            rgb: 'RGB'
        };
        
        Object.entries(specs).forEach(([key, value]) => {
            const label = specMappings[key] || key;
            let formattedValue = value;
            
            // Format values
            if (key === 'baseClock' || key === 'boostClock') {
                formattedValue = `${value} GHz`;
            } else if (key === 'tdp' || key === 'powerConsumption' || key === 'recommendedPSU' || key === 'wattage' || key === 'tdpRating') {
                formattedValue = `${value}W`;
            } else if (key === 'capacity' && product.category === 'ram') {
                formattedValue = `${value} GB`;
            } else if (key === 'capacity' && product.category === 'storage') {
                formattedValue = `${value} GB`;
            } else if (key === 'speed' && product.category === 'ram') {
                formattedValue = `${value} MHz`;
            } else if (key === 'readSpeed' || key === 'writeSpeed') {
                formattedValue = `${value} MB/s`;
            } else if (key === 'memory') {
                formattedValue = `${value} GB`;
            } else if (key === 'size') {
                formattedValue = `${value}"`;
            } else if (key === 'refreshRate') {
                formattedValue = `${value} Hz`;
            } else if (key === 'responseTime') {
                formattedValue = `${value}ms`;
            } else if (key === 'voltage') {
                formattedValue = `${value}V`;
            } else if (key === 'maxRam') {
                formattedValue = `${value} GB`;
            } else if (key === 'cache') {
                formattedValue = `${value} MB`;
            } else if (key === 'fanSize') {
                formattedValue = `${value}mm`;
            } else if (key === 'warranty') {
                formattedValue = `${value} anos`;
            } else if (key === 'maxGpuLength' || key === 'maxCpuCoolerHeight' || key === 'height' || key === 'radiatorSize') {
                formattedValue = `${value}mm`;
            } else if (key === 'modular') {
                formattedValue = value ? 'Sim' : 'Não';
            } else if (key === 'rgb') {
                formattedValue = value ? 'Sim' : 'Não';
            } else if (key === 'noise') {
                formattedValue = `${value} dB(A)`;
            } else if (Array.isArray(value)) {
                formattedValue = value.join(', ');
            }
            
            specsHtml += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color);">
                    <span style="color: var(--text-secondary); font-weight: 500;">${label}:</span>
                    <span style="color: var(--text-primary); font-weight: 600;">${formattedValue}</span>
                </div>
            `;
        });
        
        return specsHtml;
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }

    // ==================== SEARCH & FILTER ====================
    handleSearch(query = null) {
        const searchInput = document.getElementById('searchInput');
        const searchQuery = query !== null ? query : searchInput.value;
        
        if (!searchQuery.trim()) {
            this.renderProducts();
            return;
        }
        
        const filteredProducts = this.products.filter(product => {
            const searchText = searchQuery.toLowerCase();
            return (
                product.name.toLowerCase().includes(searchText) ||
                product.description.toLowerCase().includes(searchText) ||
                product.brand.toLowerCase().includes(searchText) ||
                product.category.toLowerCase().includes(searchText)
            );
        });
        
        this.renderFilteredProducts(filteredProducts);
    }

    renderFilteredProducts(products) {
        const grid = document.getElementById('productsGrid');
        const loading = document.getElementById('loading');
        
        loading.style.display = 'flex';
        grid.innerHTML = '';
        
        setTimeout(() => {
            loading.style.display = 'none';
            
            if (products.length === 0) {
                grid.innerHTML = `
                    <div class="no-products">
                        <i class="fas fa-search" style="font-size: 3rem; color: var(--accent-gray); margin-bottom: 1rem;"></i>
                        <h3>Nenhum produto encontrado</h3>
                        <p>Tente usar termos diferentes na busca.</p>
                    </div>
                `;
                return;
            }
            
            products.forEach(product => {
                const productCard = this.createProductCard(product);
                grid.appendChild(productCard);
            });
        }, 300);
    }

    sortProducts(products) {
        return [...products].sort((a, b) => {
            switch (this.currentSort) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'brand':
                    return a.brand.localeCompare(b.brand);
                default:
                    return 0;
            }
        });
    }

    // ==================== UTILITIES ====================
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    getCategoryName(category) {
        const categories = {
            motherboard: 'Placa-mãe',
            cpu: 'Processador',
            ram: 'Memória RAM',
            gpu: 'Placa de Vídeo',
            storage: 'Armazenamento',
            psu: 'Fonte',
            case: 'Gabinete',
            monitor: 'Monitor',
            cooler: 'Cooler'
        };
        return categories[category] || category;
    }

    // ==================== CHECKOUT ====================
    handleCheckout() {
        if (this.cart.length === 0) {
            this.showToast('warning', 'Carrinho Vazio', 'Adicione produtos ao carrinho antes de finalizar a compra.');
            return;
        }
        
        // Simulate checkout process
        this.showToast('info', 'Processando...', 'Redirecionando para o checkout...');
        
        setTimeout(() => {
            this.showToast('success', 'Checkout Simulado', 'Em uma aplicação real, você seria redirecionado para o pagamento.');
            this.closeModal('cartModal');
        }, 2000);
    }

    // ==================== TOAST NOTIFICATIONS ====================
    showToast(type, title, message) {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="${icons[type]} toast-icon"></i>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        container.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 5000);
    }

    // ==================== KEYBOARD SHORTCUTS ====================
    handleKeyboardShortcuts(e) {
        // Escape key to close modals and sidebar
        if (e.key === 'Escape') {
            document.getElementById('sidebar').classList.remove('active');
            document.getElementById('overlay').classList.remove('active');
            document.body.style.overflow = '';
            
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
        
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
    }

    // ==================== USER PREFERENCES ====================
    saveUserPreferences() {
        const preferences = {
            isDarkMode: this.isDarkMode,
            currentCategory: this.currentCategory,
            currentSort: this.currentSort
        };
        
        try {
            localStorage.setItem('qualcore-preferences', JSON.stringify(preferences));
        } catch (error) {
            console.warn('Could not save user preferences:', error);
        }
    }

    loadUserPreferences() {
        try {
            const saved = localStorage.getItem('qualcore-preferences');
            if (saved) {
                const preferences = JSON.parse(saved);
                
                this.isDarkMode = preferences.isDarkMode || false;
                this.currentCategory = preferences.currentCategory || 'all';
                this.currentSort = preferences.currentSort || 'name';
                
                // Apply theme
                document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
                
                const themeIcon = document.querySelector('#themeToggle i');
                const themeText = document.querySelector('.theme-text');
                const mobileThemeIcon = document.querySelector('#themeToggleMobile i');
                
                if (this.isDarkMode) {
                    themeIcon.className = 'fas fa-sun';
                    themeText.textContent = 'Light Mode';
                    mobileThemeIcon.className = 'fas fa-sun';
                } else {
                    themeIcon.className = 'fas fa-moon';
                    themeText.textContent = 'Dark Mode';
                    mobileThemeIcon.className = 'fas fa-moon';
                }
                
                // Apply category selection
                document.querySelectorAll(`[data-category="${this.currentCategory}"]`).forEach(item => {
                    item.classList.add('active');
                });
                
                // Apply sort selection
                document.getElementById('sortSelect').value = this.currentSort;
            }
        } catch (error) {
            console.warn('Could not load user preferences:', error);
        }
    }
}

// ==================== INITIALIZATION ====================
// Initialize the store when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.qualcore = new QualcoreStore();
});

// Optional Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(registrationError => console.log('SW registration failed'));
    });
}