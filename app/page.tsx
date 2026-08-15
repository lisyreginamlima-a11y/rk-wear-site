"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  image: string;
  tag?: string;
  colors: { name: string; hex: string }[];
  reference?: string;
  sizes?: string;
  sizeOptions: string[];
  description: string;
  available?: boolean;
};

type CartLine = {
  productId: number;
  quantity: number;
  size: string;
  color: string;
};

type PaymentMethod = "pix" | "debit" | "credit";

type OutfitOption = {
  productId: number;
  label: string;
  style: string;
  overlay: string;
  overlaySide: string;
  overlayBack: string;
  colors: { name: string; hex: string }[];
};

type SizeRecommendation = {
  top: string;
  bottom: string;
  length: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Conjunto Fitness Black",
    category: "RK Fitness",
    image: "/instagram/fitness-black.jpg",
    tag: "Lançamento",
    colors: [{ name: "Preto", hex: "#151515" }],
    sizes: "Consulte tamanhos",
    sizeOptions: ["P", "M", "G", "A confirmar"],
    description:
      "Conjunto versátil com visual urbano e confortável, pensado para acompanhar sua rotina com estilo.",
  },
  {
    id: 2,
    name: "Calça Courino Zara",
    category: "Essência",
    image: "/instagram/calca-courino-zara-white.png",
    tag: "Ref. 0576",
    colors: [{ name: "Preto", hex: "#111111" }],
    reference: "0576",
    sizes: "P · M · G",
    sizeOptions: ["P", "M", "G"],
    description:
      "Calça de presença marcante, acabamento elegante e modelagem contemporânea para produções sofisticadas.",
  },
  {
    id: 3,
    name: "Blusa Aura + Saia Brisa",
    category: "Essência",
    image: "/instagram/aura-brisa-marrom.jpg",
    tag: "Coleção Essência",
    colors: [
      { name: "Marrom", hex: "#684a38" },
      { name: "Preto", hex: "#171717" },
      { name: "Off-white", hex: "#f3eee5" },
      { name: "Vinho", hex: "#702f3a" },
    ],
    reference: "Aura 045 · Brisa 048",
    sizes: "P · M · G",
    sizeOptions: ["P", "M", "G"],
    description:
      "Composição leve e feminina que une textura, movimento e tons terrosos em uma proposta autoral.",
  },
  {
    id: 4,
    name: "Conjunto Charlotte Xadrez",
    category: "Essência",
    image: "/instagram/charlotte-xadrez.jpg",
    tag: "Ref. 040",
    colors: [
      { name: "Preto", hex: "#1d1d1d" },
      { name: "Cinza", hex: "#8a837b" },
    ],
    reference: "040",
    sizes: "P · M",
    sizeOptions: ["P", "M"],
    description:
      "Conjunto xadrez de alfaiataria leve, criado para transitar entre ocasiões com elegância natural.",
  },
  {
    id: 5,
    name: "Conjunto Renda Cacau",
    category: "Conjuntos",
    image: "/instagram/conjunto-renda-cacau.jpg",
    colors: [{ name: "Cacau", hex: "#744526" }],
    sizes: "Consulte tamanhos",
    sizeOptions: ["P", "M", "G", "A confirmar"],
    description:
      "Renda delicada em tom cacau, com uma leitura romântica e atual para momentos especiais.",
  },
  {
    id: 6,
    name: "Conjunto Lilás",
    category: "Conjuntos",
    image: "/instagram/conjunto-lilas.jpg",
    tag: "Edição limitada",
    colors: [{ name: "Lilás", hex: "#d8bee1" }],
    sizes: "Consulte tamanhos",
    sizeOptions: ["P", "M", "G", "A confirmar"],
    description:
      "Edição limitada em lilás suave, com caimento leve e acabamento feminino para um visual memorável.",
  },
  {
    id: 7,
    name: "Vestido Brasil",
    category: "Vestidos",
    image: "/instagram/vestido-brasil-white.png",
    tag: "Esgotado",
    colors: [
      { name: "Amarelo", hex: "#e3d229" },
      { name: "Verde", hex: "#386b45" },
    ],
    sizes: "Edição exclusiva",
    sizeOptions: [],
    description:
      "Vestido exclusivo inspirado nas cores do Brasil, produzido em quantidade limitada.",
    available: false,
  },
  {
    id: 8,
    name: "Conjunto Azul Capítulo I",
    category: "Capítulo I",
    image: "/instagram/conjunto-azul-capitulo-1.jpg",
    tag: "Novidade",
    colors: [{ name: "Azul-claro", hex: "#b8d9ef" }],
    sizes: "Consulte tamanhos",
    sizeOptions: ["P", "M", "G", "A confirmar"],
    description:
      "Conjunto azul-claro com top estruturado e saia de cintura alta, em uma proposta leve e feminina.",
  },
  {
    id: 9,
    name: "Conjunto Pink Capítulo I",
    category: "Capítulo I",
    image: "/instagram/conjunto-pink-capitulo-1.jpg",
    tag: "Esgotado",
    colors: [{ name: "Pink", hex: "#ed4aae" }],
    sizes: "Edição esgotada",
    sizeOptions: [],
    description:
      "Conjunto pink com top cropped e short de alfaiataria, apresentado na coleção Capítulo I.",
    available: false,
  },
  {
    id: 10,
    name: "Conjunto Amarelo Capítulo I",
    category: "Capítulo I",
    image: "/instagram/conjunto-amarelo-capitulo-1.jpg",
    tag: "Esgotado",
    colors: [{ name: "Amarelo-claro", hex: "#f4e7a8" }],
    sizes: "Edição esgotada",
    sizeOptions: [],
    description:
      "Conjunto amarelo-claro com camisa fluida e short leve, apresentado na coleção Capítulo I.",
    available: false,
  },
  {
    id: 11,
    name: "Conjunto Amarelo Transpassado",
    category: "Conjuntos",
    image: "/instagram/conjunto-amarelo-transpassado-white.png",
    tag: "Novidade",
    colors: [{ name: "Amarelo-claro", hex: "#f2e3a6" }],
    sizes: "Consulte tamanhos",
    sizeOptions: ["P", "M", "G", "A confirmar"],
    description:
      "Conjunto amarelo-claro com top transpassado e calça fluida, pensado para um visual leve e marcante.",
  },
  {
    id: 12,
    name: "Blusa Assimétrica Preta",
    category: "Blusas",
    image: "/instagram/blusa-assimetrica-preta-white.png",
    tag: "Novidade",
    colors: [{ name: "Preto", hex: "#111111" }],
    sizes: "P · M",
    sizeOptions: ["P", "M"],
    description:
      "Blusa preta assimétrica de ombro único, com movimento e caimento leve para composições elegantes.",
  },
  {
    id: 13,
    name: "Blusas Manga Fluida",
    category: "Blusas",
    image: "/instagram/blusas-manga-fluida-white.png",
    tag: "Destaque do Instagram",
    colors: [
      { name: "Azul-marinho", hex: "#17264d" },
      { name: "Telha", hex: "#bd5d2b" },
      { name: "Off-white", hex: "#f4f0e8" },
      { name: "Preto", hex: "#171717" },
    ],
    sizes: "Consulte tamanhos",
    sizeOptions: ["P", "M", "G", "A confirmar"],
    description:
      "Blusa leve de manga fluida, disponível em uma cartela versátil para composições elegantes e confortáveis.",
  },
  {
    id: 14,
    name: "Camisetas Essenciais",
    category: "Blusas",
    image: "/instagram/camisetas-essenciais-white.png",
    tag: "Destaque do Instagram",
    colors: [
      { name: "Marrom", hex: "#633921" },
      { name: "Bege", hex: "#cfc3a8" },
      { name: "Off-white", hex: "#f5f0e8" },
      { name: "Nude", hex: "#d8c1b1" },
      { name: "Preto", hex: "#151515" },
    ],
    sizes: "Consulte tamanhos",
    sizeOptions: ["P", "M", "G", "A confirmar"],
    description:
      "Camiseta essencial de caimento leve e visual minimalista, ideal para multiplicar as combinações do dia a dia.",
  },
  {
    id: 15,
    name: "Blusas Drapeadas",
    category: "Blusas",
    image: "/instagram/blusas-drapeadas-white.png",
    tag: "Destaque do Instagram",
    colors: [
      { name: "Cacau", hex: "#70402e" },
      { name: "Vinho", hex: "#722738" },
      { name: "Off-white", hex: "#f4f0e9" },
      { name: "Preto", hex: "#151515" },
    ],
    sizes: "Consulte tamanhos",
    sizeOptions: ["P", "M", "G", "A confirmar"],
    description:
      "Blusa de manga longa com drapeado marcante e detalhes em transparência, pensada para produções sofisticadas.",
  },
  {
    id: 16,
    name: "Conjunto Verde Cropped",
    category: "Conjuntos",
    image: "/instagram/conjunto-verde-cropped-white.png",
    tag: "Destaque do Instagram",
    colors: [{ name: "Verde-oliva", hex: "#59614f" }],
    sizes: "Consulte tamanhos",
    sizeOptions: ["P", "M", "G", "A confirmar"],
    description:
      "Conjunto verde-oliva com top cropped estruturado, calça ampla de cintura alta e cinto delicado.",
  },
  {
    id: 17,
    name: "Conjunto Preto Recortado",
    category: "Conjuntos",
    image: "/instagram/conjunto-preto-recortado-white.png",
    tag: "Destaque do Instagram",
    colors: [{ name: "Preto", hex: "#111111" }],
    sizes: "Consulte tamanhos",
    sizeOptions: ["P", "M", "G", "A confirmar"],
    description:
      "Conjunto preto com top de recortes marcantes e calça ampla, combinando atitude e elegância.",
  },
  {
    id: 18,
    name: "Conjunto Cacau Assimétrico",
    category: "Conjuntos",
    image: "/instagram/conjunto-cacau-assimetrico-white.png",
    tag: "Destaque do Instagram",
    colors: [{ name: "Cacau", hex: "#8b4f33" }],
    sizes: "Consulte tamanhos",
    sizeOptions: ["P", "M", "G", "A confirmar"],
    description:
      "Conjunto cacau com amarração frontal, short de cintura alta e sobreposição assimétrica fluida.",
  },
  {
    id: 19,
    name: "Macacão Preto com Renda",
    category: "Macacões",
    image: "/instagram/macacao-preto-renda-white.png",
    tag: "Destaque do Instagram",
    colors: [{ name: "Preto", hex: "#111111" }],
    sizes: "Consulte tamanhos",
    sizeOptions: ["P", "M", "G", "A confirmar"],
    description:
      "Macacão preto de pernas amplas, decote profundo com renda e faixa na cintura para um visual sofisticado.",
  },
  {
    id: 20,
    name: "Blusa Branca com Renda",
    category: "Blusas",
    image: "/instagram/blusa-branca-renda-white.png",
    tag: "Destaque do Instagram",
    colors: [{ name: "Branco", hex: "#f7f7f4" }],
    sizes: "Consulte tamanhos",
    sizeOptions: ["P", "M", "G", "A confirmar"],
    description:
      "Blusa branca leve com barra assimétrica em renda, criada para composições delicadas e versáteis.",
  },
];

const topOptions: OutfitOption[] = [
  {
    productId: 13,
    label: "Manga fluida",
    style: "flowy",
    overlay: "/mannequin/garments/top-flowy.png",
    overlaySide: "/mannequin/garments/top-flowy-side.png",
    overlayBack: "/mannequin/garments/top-flowy-back.png",
    colors: [
      { name: "Azul-marinho", hex: "#17264d" },
      { name: "Telha", hex: "#bd5d2b" },
      { name: "Off-white", hex: "#f4f0e8" },
      { name: "Preto", hex: "#171717" },
    ],
  },
  {
    productId: 15,
    label: "Drapeada",
    style: "draped",
    overlay: "/mannequin/garments/top-draped.png",
    overlaySide: "/mannequin/garments/top-draped-side.png",
    overlayBack: "/mannequin/garments/top-draped-back.png",
    colors: [
      { name: "Cacau", hex: "#70402e" },
      { name: "Vinho", hex: "#722738" },
      { name: "Off-white", hex: "#f4f0e9" },
      { name: "Preto", hex: "#151515" },
    ],
  },
  {
    productId: 20,
    label: "Renda branca",
    style: "lace",
    overlay: "/mannequin/garments/top-lace.png",
    overlaySide: "/mannequin/garments/top-lace-side.png",
    overlayBack: "/mannequin/garments/top-lace-back.png",
    colors: [{ name: "Branco", hex: "#f7f7f4" }],
  },
  {
    productId: 12,
    label: "Assimétrica",
    style: "asymmetric",
    overlay: "/mannequin/garments/top-asymmetric.png",
    overlaySide: "/mannequin/garments/top-asymmetric-side.png",
    overlayBack: "/mannequin/garments/top-asymmetric-back.png",
    colors: [{ name: "Preto", hex: "#111111" }],
  },
  {
    productId: 16,
    label: "Cropped",
    style: "cropped",
    overlay: "/mannequin/garments/top-cropped.png",
    overlaySide: "/mannequin/garments/top-cropped-side.png",
    overlayBack: "/mannequin/garments/top-cropped-back.png",
    colors: [{ name: "Verde-oliva", hex: "#59614f" }],
  },
];

const bottomOptions: OutfitOption[] = [
  {
    productId: 2,
    label: "Calça courino",
    style: "courino",
    overlay: "/mannequin/garments/bottom-courino.png",
    overlaySide: "/mannequin/garments/bottom-courino-side.png",
    overlayBack: "/mannequin/garments/bottom-courino-back.png",
    colors: [{ name: "Preto", hex: "#111111" }],
  },
  {
    productId: 3,
    label: "Saia Brisa",
    style: "skirt",
    overlay: "/mannequin/garments/bottom-skirt.png",
    overlaySide: "/mannequin/garments/bottom-skirt-side.png",
    overlayBack: "/mannequin/garments/bottom-skirt-back.png",
    colors: [
      { name: "Marrom", hex: "#684a38" },
      { name: "Preto", hex: "#171717" },
      { name: "Off-white", hex: "#f3eee5" },
      { name: "Vinho", hex: "#702f3a" },
    ],
  },
  {
    productId: 4,
    label: "Pantalona xadrez",
    style: "wide",
    overlay: "/mannequin/garments/bottom-wide.png",
    overlaySide: "/mannequin/garments/bottom-wide-side.png",
    overlayBack: "/mannequin/garments/bottom-wide-back.png",
    colors: [
      { name: "Preto", hex: "#1d1d1d" },
      { name: "Cinza", hex: "#8a837b" },
    ],
  },
  {
    productId: 18,
    label: "Short cacau",
    style: "shorts",
    overlay: "/mannequin/garments/bottom-shorts.png",
    overlaySide: "/mannequin/garments/bottom-shorts-side.png",
    overlayBack: "/mannequin/garments/bottom-shorts-back.png",
    colors: [{ name: "Cacau", hex: "#8b4f33" }],
  },
  {
    productId: 16,
    label: "Calça verde",
    style: "tailored",
    overlay: "/mannequin/garments/bottom-tailored.png",
    overlaySide: "/mannequin/garments/bottom-tailored-side.png",
    overlayBack: "/mannequin/garments/bottom-tailored-back.png",
    colors: [{ name: "Verde-oliva", hex: "#59614f" }],
  },
];

function isLightGarmentColor(hex: string) {
  const value = hex.replace("#", "");
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  const luminance = red * 0.299 + green * 0.587 + blue * 0.114;
  return luminance >= 185;
}

export default function Home() {
  const [category, setCategory] = useState("Todos");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [topColorIndex, setTopColorIndex] = useState(0);
  const [bottomColorIndex, setBottomColorIndex] = useState(0);
  const [measurements, setMeasurements] = useState({
    bust: "",
    waist: "",
    hips: "",
    height: "",
  });
  const [sizeRecommendation, setSizeRecommendation] =
    useState<SizeRecommendation | null>(null);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setSelectedProduct(null);
      setCartOpen(false);
      setPaymentOpen(false);
      setMenuOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const filtered = useMemo(
    () =>
      category === "Todos"
        ? products
        : products.filter((product) => product.category === category),
    [category],
  );

  const cartItems = cart.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ ...product, ...line }] : [];
  });
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const checkoutMessage = encodeURIComponent(
    `Olá, RK WEAR! Tenho interesse nestas peças:\n${cartItems
      .map(
        (item) =>
          `• ${item.name} — tamanho ${item.size}, cor ${item.color} (${item.quantity}x)`,
      )
      .join("\n")}\n\nPode me informar valores, cores e tamanhos disponíveis?`,
  );
  const paymentLabels: Record<PaymentMethod, string> = {
    pix: "Pix",
    debit: "cartão de débito",
    credit: "cartão de crédito",
  };
  const paymentMessage = encodeURIComponent(
    `Olá, RK WEAR! Quero finalizar meu pedido com ${paymentLabels[paymentMethod]}:\n${cartItems
      .map(
        (item) =>
          `• ${item.name} — tamanho ${item.size}, cor ${item.color} (${item.quantity}x)`,
      )
      .join(
        "\n",
      )}\n\nPor favor, confirme o valor e envie o link oficial e seguro para pagamento. Não enviarei dados do cartão pelo WhatsApp.`,
  );

  function openPayment() {
    if (cartItems.length === 0) return;
    setCartOpen(false);
    setPaymentOpen(true);
  }

  function openProduct(product: Product) {
    setSelectedProduct(product);
    setSelectedSize(product.sizeOptions[0] || "");
    setSelectedColor(product.colors[0]?.name || "A confirmar");
    setDetailQuantity(1);
  }

  function addToCart(
    product: Product,
    size: string,
    color: string,
    quantity = 1,
  ) {
    if (product.available === false) return;
    const normalizedSize = size || "A confirmar";
    const normalizedColor = color || "A confirmar";
    setCart((current) => {
      const existing = current.find(
        (line) =>
          line.productId === product.id &&
          line.size === normalizedSize &&
          line.color === normalizedColor,
      );

      if (!existing) {
        return [
          ...current,
          {
            productId: product.id,
            quantity,
            size: normalizedSize,
            color: normalizedColor,
          },
        ];
      }

      return current.map((line) =>
        line.productId === product.id &&
        line.size === normalizedSize &&
        line.color === normalizedColor
          ? { ...line, quantity: line.quantity + quantity }
          : line,
      );
    });
    setSelectedProduct(null);
    setCartOpen(true);
  }

  function updateQuantity(
    productId: number,
    size: string,
    color: string,
    change: number,
  ) {
    setCart((current) =>
      current
        .map((line) =>
          line.productId === productId &&
          line.size === size &&
          line.color === color
            ? { ...line, quantity: Math.max(0, line.quantity + change) }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }

  function toggleFavorite(id: number) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((favorite) => favorite !== id)
        : [...current, id],
    );
  }

  function submitNewsletter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("Bem-vinda ao nosso círculo. Seu cadastro foi recebido.");
    event.currentTarget.reset();
  }

  function calculateRecommendedSize(value: number, measurement: "bust" | "waist" | "hips") {
    const limits = {
      bust: [82, 88, 94, 102],
      waist: [64, 70, 76, 84],
      hips: [90, 96, 102, 110],
    }[measurement];
    const sizes = ["PP", "P", "M", "G", "GG"];
    const index = limits.findIndex((limit) => value <= limit);
    return index === -1 ? 4 : index;
  }

  function submitMeasurements(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const bust = Number(measurements.bust);
    const waist = Number(measurements.waist);
    const hips = Number(measurements.hips);
    const height = Number(measurements.height);
    if (![bust, waist, hips, height].every((value) => value > 0)) return;

    const sizes = ["PP", "P", "M", "G", "GG"];
    const topSize = Math.max(
      calculateRecommendedSize(bust, "bust"),
      calculateRecommendedSize(waist, "waist"),
    );
    const bottomSize = Math.max(
      calculateRecommendedSize(waist, "waist"),
      calculateRecommendedSize(hips, "hips"),
    );
    const length =
      height < 158
        ? "Comprimento curto — algumas calças podem precisar de ajuste."
        : height > 172
          ? "Comprimento alongado — confirme o comprimento das calças."
          : "Comprimento padrão tende a vestir melhor.";

    setSizeRecommendation({
      top: sizes[topSize],
      bottom: sizes[bottomSize],
      length,
    });
  }

  const selectedTop = topOptions[topIndex];
  const selectedBottom = bottomOptions[bottomIndex];
  const selectedTopProduct = products.find(
    (product) => product.id === selectedTop.productId,
  );
  const selectedBottomProduct = products.find(
    (product) => product.id === selectedBottom.productId,
  );
  const topColorIsLight = isLightGarmentColor(selectedTop.colors[topColorIndex].hex);
  const bottomColorIsLight = isLightGarmentColor(
    selectedBottom.colors[bottomColorIndex].hex,
  );
  const fittingMessage = sizeRecommendation
    ? encodeURIComponent(
        `Olá, RK WEAR! Usei o provador do site. Minhas medidas são: busto ${measurements.bust} cm, cintura ${measurements.waist} cm, quadril ${measurements.hips} cm e altura ${measurements.height} cm. A estimativa foi ${sizeRecommendation.top} para parte de cima e ${sizeRecommendation.bottom} para parte de baixo. Pode confirmar o tamanho das peças?`,
      )
    : "";

  return (
    <main id="inicio">
      <div className="announcement">
        <span>Peças limitadas e exclusivas</span>
        <span className="announcement-extra">
          Enviamos para todo o Brasil · Atendimento pelo WhatsApp
        </span>
      </div>

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="RK WEAR">
          <span>RK</span>
          <small>WEAR</small>
        </a>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`}>
          <button
            className="nav-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          >
            ×
          </button>
          <a href="#novidades" onClick={() => setMenuOpen(false)}>
            Novidades
          </a>
          <a href="#colecao" onClick={() => setMenuOpen(false)}>
            Coleção
          </a>
          <a href="#provador" onClick={() => setMenuOpen(false)}>
            Provador
          </a>
          <a href="#manifesto" onClick={() => setMenuOpen(false)}>
            A marca
          </a>
          <a href="#atendimento" onClick={() => setMenuOpen(false)}>
            Atendimento
          </a>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <span />
            <span />
          </button>
          <a className="text-action" href="#colecao">
            Buscar
          </a>
          <button
            className="text-action cart-action"
            onClick={() => setCartOpen(true)}
            aria-label={`Abrir sacola com ${cartCount} itens`}
          >
            <span className="cart-glyph" aria-hidden="true">
              <i />
              <i />
            </span>
            <span className="cart-label">Sacola</span>
            <strong>{cartCount}</strong>
          </button>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <img
          className="hero-profile-image"
          src="/instagram/rk-cover-hd.png"
          alt="RK WEAR"
        />
        <h1 id="hero-title" className="sr-only">
          RK WEAR
        </h1>
        <a className="hero-scroll" href="#colecao">
          Conheça a coleção <span>↓</span>
        </a>
      </section>

      <section className="benefits" aria-label="Benefícios">
        <div>
          <strong>Alta moda feminina</strong>
          <span>Para mulheres que decidiram não ser comum</span>
        </div>
        <div>
          <strong>Peças exclusivas</strong>
          <span>Seleções limitadas, com identidade</span>
        </div>
        <div>
          <strong>Atendimento humano</strong>
          <span>Valores e tamanhos direto no WhatsApp</span>
        </div>
      </section>

      <section className="collection section" id="colecao">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Direto do Instagram</p>
            <h2>Vista sua melhor versão.</h2>
          </div>
          <p>
            Uma seleção das peças publicadas pela RK WEAR. Consulte valores,
            cores e disponibilidade com nossa equipe.
          </p>
        </div>

        <div className="filters" aria-label="Filtrar coleção">
          {[
            "Todos",
            "Essência",
            "RK Fitness",
            "Conjuntos",
            "Blusas",
            "Macacões",
            "Capítulo I",
            "Vestidos",
          ].map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filtered.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                <button
                  className="product-open"
                  onClick={() => openProduct(product)}
                  aria-label={`Ver detalhes de ${product.name}`}
                >
                  <img src={product.image} alt={product.name} loading="lazy" />
                </button>
                {product.tag && <span className="product-tag">{product.tag}</span>}
                <button
                  className={`favorite ${
                    favorites.includes(product.id) ? "is-favorite" : ""
                  }`}
                  onClick={() => toggleFavorite(product.id)}
                  aria-label={
                    favorites.includes(product.id)
                      ? `Remover ${product.name} dos favoritos`
                      : `Adicionar ${product.name} aos favoritos`
                  }
                >
                  {favorites.includes(product.id) ? "♥" : "♡"}
                </button>
                <button
                  className="quick-add"
                  onClick={() => openProduct(product)}
                  aria-label={`Ver detalhes de ${product.name}`}
                >
                  {product.available === false ? "Ver peça" : "Ver detalhes"}
                </button>
              </div>
              <div className="product-info">
                <div>
                  <button
                    className="product-name"
                    onClick={() => openProduct(product)}
                  >
                    <h3>{product.name}</h3>
                  </button>
                  <span>
                    {product.category}
                    {product.reference ? ` · Ref. ${product.reference}` : ""}
                  </span>
                </div>
                <strong>Consultar</strong>
              </div>
              {product.sizes && <p className="product-sizes">{product.sizes}</p>}
              <div className="swatches" aria-label="Cores disponíveis">
                {product.colors.map((color) => (
                  <span
                    key={color.name}
                    title={color.name}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="virtual-fitting section" id="provador">
        <div className="section-heading fitting-heading">
          <div>
            <p className="eyebrow">Provador de looks RK</p>
            <h2>Escolha. Combine. Experimente.</h2>
          </div>
          <p>
            Combine blusas e partes de baixo do catálogo em um manequim frontal,
            com as roupas encaixadas rente ao corpo.
          </p>
        </div>

        <div className="fitting-studio">
          <div className="mannequin-panel">
            <div className="mannequin-stage" aria-label="Manequim frontal com o look escolhido">
              <div className="mannequin-shadow" />
              <div
                className="mannequin-visual view-front"
                style={
                  {
                    "--top-color": selectedTop.colors[topColorIndex].hex,
                    "--bottom-color": selectedBottom.colors[bottomColorIndex].hex,
                  } as React.CSSProperties
                }
              >
                <img
                  className="mannequin-model"
                  src="/mannequin/rk-mannequin-front.png"
                  alt="Manequim técnico 3D com malha cinza"
                  draggable="false"
                />
                <div className={`garment-layer garment-top garment-top-${selectedTop.style}`}>
                  <img
                    src={selectedTop.overlay}
                    alt=""
                    draggable="false"
                    style={{
                      filter: topColorIsLight
                        ? "grayscale(1) brightness(2.2) contrast(0.62)"
                        : "none",
                    }}
                  />
                  <span
                    className="garment-tint"
                    style={
                      {
                        "--garment-color": selectedTop.colors[topColorIndex].hex,
                        "--garment-mask": `url(${selectedTop.overlay})`,
                        "--garment-opacity": topColorIsLight ? 0.86 : 0.68,
                        "--garment-blend": topColorIsLight ? "normal" : "color",
                      } as React.CSSProperties
                    }
                  />
                </div>
                <div className={`garment-layer garment-bottom garment-bottom-${selectedBottom.style}`}>
                  <img
                    src={selectedBottom.overlay}
                    alt=""
                    draggable="false"
                    style={{
                      filter: bottomColorIsLight
                        ? "grayscale(1) brightness(2.2) contrast(0.62)"
                        : "none",
                    }}
                  />
                  <span
                    className="garment-tint"
                    style={
                      {
                        "--garment-color": selectedBottom.colors[bottomColorIndex].hex,
                        "--garment-mask": `url(${selectedBottom.overlay})`,
                        "--garment-opacity": bottomColorIsLight ? 0.86 : 0.68,
                        "--garment-blend": bottomColorIsLight ? "normal" : "color",
                      } as React.CSSProperties
                    }
                  />
                </div>
              </div>
            </div>
            <div className="selected-look">
              <span>Seu look</span>
              <strong>{selectedTop.label} + {selectedBottom.label}</strong>
            </div>
          </div>

          <div className="outfit-controls">
            <div className="outfit-group">
              <div className="outfit-group-title">
                <span>01</span>
                <div>
                  <p>Escolha a parte de cima</p>
                  <strong>{selectedTop.label}</strong>
                </div>
              </div>
              <div className="outfit-options">
                {topOptions.map((option, index) => (
                  <button
                    key={option.label}
                    className={topIndex === index ? "active" : ""}
                    onClick={() => {
                      setTopIndex(index);
                      setTopColorIndex(0);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="fitting-swatches" aria-label="Cor da parte de cima">
                {selectedTop.colors.map((color, index) => (
                  <button
                    key={color.name}
                    className={topColorIndex === index ? "active" : ""}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setTopColorIndex(index)}
                    aria-label={`Parte de cima na cor ${color.name}`}
                    title={color.name}
                  />
                ))}
                <span>{selectedTop.colors[topColorIndex].name}</span>
              </div>
            </div>

            <div className="outfit-group">
              <div className="outfit-group-title">
                <span>02</span>
                <div>
                  <p>Escolha a parte de baixo</p>
                  <strong>{selectedBottom.label}</strong>
                </div>
              </div>
              <div className="outfit-options">
                {bottomOptions.map((option, index) => (
                  <button
                    key={option.label}
                    className={bottomIndex === index ? "active" : ""}
                    onClick={() => {
                      setBottomIndex(index);
                      setBottomColorIndex(0);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="fitting-swatches" aria-label="Cor da parte de baixo">
                {selectedBottom.colors.map((color, index) => (
                  <button
                    key={color.name}
                    className={bottomColorIndex === index ? "active" : ""}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setBottomColorIndex(index)}
                    aria-label={`Parte de baixo na cor ${color.name}`}
                    title={color.name}
                  />
                ))}
                <span>{selectedBottom.colors[bottomColorIndex].name}</span>
              </div>
            </div>

            <div className="look-actions">
              {selectedTopProduct && (
                <button className="button button-dark" onClick={() => openProduct(selectedTopProduct)}>
                  Ver parte de cima
                </button>
              )}
              {selectedBottomProduct && (
                <button className="button button-outline" onClick={() => openProduct(selectedBottomProduct)}>
                  Ver parte de baixo
                </button>
              )}
            </div>
            <p className="fitting-catalog-note">
              A simulação ajuda a visualizar a combinação. Confirme cores,
              disponibilidade e venda separada nos detalhes de cada peça.
            </p>
          </div>
        </div>

        <div className="size-finder">
          <div className="size-finder-intro">
            <p className="eyebrow">Descubra seu tamanho</p>
            <h3>Suas medidas, uma escolha mais segura.</h3>
            <p>
              Informe suas medidas em centímetros para receber uma estimativa
              separada para blusas e partes de baixo.
            </p>
            <div className="privacy-note">
              <span aria-hidden="true">✓</span>
              <p><strong>Privacidade:</strong> o cálculo acontece somente neste aparelho. Suas medidas não são salvas.</p>
            </div>
          </div>

          <form className="measurement-form" onSubmit={submitMeasurements}>
            <div className="measurement-fields">
              {[
                ["bust", "Busto", "Contorne a parte mais cheia"],
                ["waist", "Cintura", "Meça a parte mais fina"],
                ["hips", "Quadril", "Contorne a parte mais larga"],
                ["height", "Altura", "Da cabeça aos pés"],
              ].map(([field, label, hint]) => (
                <label key={field}>
                  <span>{label}</span>
                  <small>{hint}</small>
                  <span className="measurement-input">
                    <input
                      type="number"
                      inputMode="decimal"
                      min="1"
                      max="250"
                      step="0.5"
                      placeholder="00"
                      value={measurements[field as keyof typeof measurements]}
                      onChange={(event) => {
                        setMeasurements((current) => ({
                          ...current,
                          [field]: event.target.value,
                        }));
                        setSizeRecommendation(null);
                      }}
                      required
                    />
                    <b>cm</b>
                  </span>
                </label>
              ))}
            </div>
            <button className="button button-dark size-submit" type="submit">
              Descobrir meus tamanhos
            </button>

            {sizeRecommendation && (
              <div className="size-result" aria-live="polite">
                <p>Sua estimativa RK</p>
                <div>
                  <span><small>Parte de cima</small><strong>{sizeRecommendation.top}</strong></span>
                  <span><small>Parte de baixo</small><strong>{sizeRecommendation.bottom}</strong></span>
                </div>
                <p>{sizeRecommendation.length}</p>
                <a
                  className="text-link"
                  href={`https://wa.me/5511953836092?text=${fittingMessage}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Confirmar medidas com a RK WEAR <span>↗</span>
                </a>
              </div>
            )}
            <p className="size-disclaimer">
              Esta recomendação é uma estimativa corporal. A modelagem pode variar
              entre as peças; confirme a tabela e o caimento antes da compra.
            </p>
          </form>
        </div>
      </section>

      <section className="editorial" id="novidades">
        <div className="editorial-image editorial-brand" aria-hidden="true">
          <span>RK</span>
          <small>ESSÊNCIA · 2026</small>
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">Coleção Essência</p>
          <h2>Para mulheres que decidiram não ser comum.</h2>
          <p>
            A Blusa Aura e a Saia Brisa traduzem a essência da RK WEAR:
            presença, feminilidade e personalidade em cada detalhe.
          </p>
          <a className="button button-dark" href="#colecao">
            Ver coleção
          </a>
          <span className="editorial-number">RK / 2026</span>
        </div>
      </section>

      <section className="style-notes section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Guia de estilo</p>
            <h2>Vista o seu ritmo.</h2>
          </div>
          <a className="text-link" href="#colecao">
            Ver coleção completa <span>↗</span>
          </a>
        </div>
        <div className="style-notes-grid">
          <article>
            <span>01</span>
            <h3>Presença sem excesso.</h3>
            <p>Modelagens que valorizam o look e deixam sua personalidade falar.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Texturas que marcam.</h3>
            <p>Renda, xadrez e tecidos estruturados para criar combinações únicas.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Do casual ao especial.</h3>
            <p>Peças versáteis para acompanhar diferentes momentos do seu dia.</p>
          </article>
        </div>
      </section>

      <section className="manifesto" id="manifesto">
        <div className="manifesto-mark">RK</div>
        <p className="eyebrow light">Nosso manifesto</p>
        <blockquote>
          “Não criamos roupas para uma ocasião. Criamos peças para a mulher que
          você escolhe ser todos os dias.”
        </blockquote>
        <p>
          Peças limitadas, escolhas exclusivas e uma curadoria criada para
          valorizar a sua melhor versão.
        </p>
        <a className="text-link light-link" href="#atendimento">
          Conheça a RK WEAR <span>↗</span>
        </a>
      </section>

      <section className="testimonials section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Acontece no Instagram</p>
            <h2>Entre no universo RK.</h2>
          </div>
          <div className="rating">
            <strong>27</strong>
            <span>publicações</span>
            <small>@rkwear2026</small>
          </div>
        </div>
        <div className="testimonial-grid">
          <article>
            <span>NOVIDADES</span>
            <p>
              Acompanhe os lançamentos e descubra as novas peças selecionadas
              para a coleção RK WEAR.
            </p>
            <strong>Novas escolhas RK</strong>
            <small>Perfil oficial</small>
          </article>
          <article>
            <span>PROVADOR</span>
            <p>
              Acompanhe caimento, detalhes e combinações antes de escolher a sua
              próxima peça.
            </p>
            <strong>Mais segurança para escolher</strong>
            <small>Destaque do Instagram</small>
          </article>
          <article>
            <span>FEEDBACK</span>
            <p>
              Confira os retornos compartilhados pela comunidade RK WEAR
              diretamente no perfil oficial.
            </p>
            <strong>Comunidade RK</strong>
            <small>@rkwear2026</small>
          </article>
        </div>
        <a
          className="button button-dark instagram-cta"
          href="https://www.instagram.com/rkwear2026/"
          target="_blank"
          rel="noreferrer"
        >
          Seguir no Instagram
        </a>
      </section>

      <section className="service" id="atendimento">
        <div className="service-image service-brand" aria-hidden="true">
          <span>RK</span>
          <p>Atendimento com cuidado em cada escolha.</p>
        </div>
        <div className="service-copy">
          <p className="eyebrow">Atendimento particular</p>
          <h2>Seu provador, onde você estiver.</h2>
          <p>
            Conte para nossa consultora o que você procura. Ajudamos com
            medidas, combinações e escolhas para cada momento.
          </p>
          <ol>
            <li>
              <span>01</span>
              <div>
                <strong>Conversa rápida</strong>
                <p>Entendemos seu estilo, ocasião e preferências.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <strong>Curadoria pessoal</strong>
                <p>Enviamos sugestões que conversam com o seu guarda-roupa.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <strong>Escolha sem pressão</strong>
                <p>Você decide com calma e conta conosco em cada etapa.</p>
              </div>
            </li>
          </ol>
          <div className="service-contact">
            <a
              className="button button-dark"
              href="https://wa.me/5511953836092?text=Ol%C3%A1%2C%20RK%20WEAR!%20Gostaria%20de%20receber%20atendimento."
              target="_blank"
              rel="noreferrer"
            >
              Falar no WhatsApp
            </a>
            <a href="tel:+5511953836092">(11) 95383-6092</a>
          </div>
        </div>
      </section>

      <section className="newsletter">
        <p className="eyebrow">Entre para o nosso círculo</p>
        <h2>Novidades que valem abrir.</h2>
        <p>
          Lançamentos em primeira mão, histórias da marca e uma curadoria
          mensal de estilo.
        </p>
        <form onSubmit={submitNewsletter}>
          <label className="sr-only" htmlFor="newsletter-email">
            Seu melhor e-mail
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Seu melhor e-mail"
            required
          />
          <button type="submit">Quero receber</button>
        </form>
        {notice && <div className="form-notice" role="status">{notice}</div>}
      </section>

      <footer>
        <div className="footer-top">
          <a className="brand footer-brand" href="#inicio">
            <span>RK</span>
            <small>WEAR</small>
          </a>
          <p>
            Moda autoral brasileira para mulheres que escolhem presença, sem
            abrir mão de conforto.
          </p>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/rkwear2026/"
              target="_blank"
              rel="noreferrer"
            >
              @rkwear2026
            </a>
            <a href="#inicio">Pinterest</a>
            <a
              href="https://wa.me/5511953836092?text=Ol%C3%A1%2C%20RK%20WEAR!%20Gostaria%20de%20receber%20atendimento."
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <strong>Comprar</strong>
            <a href="#colecao">Novidades</a>
            <a href="#colecao">Coleção Essência</a>
            <a href="#colecao">RK Fitness</a>
            <a href="#colecao">Vestidos</a>
          </div>
          <div>
            <strong>Ajuda</strong>
            <a href="#atendimento">Tamanhos e medidas</a>
            <a href="#atendimento">Envios e entregas</a>
            <a href="#atendimento">Trocas e devoluções</a>
            <a href="#atendimento">Fale conosco</a>
          </div>
          <div>
            <strong>RK WEAR</strong>
            <a href="#manifesto">Nossa história</a>
            <a href="#manifesto">Materiais</a>
            <a href="#manifesto">Produção consciente</a>
            <a href="#manifesto">Diário</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 RK WEAR</span>
          <span>Feito no Brasil, com intenção.</span>
          <div>
            <a href="#inicio">Privacidade</a>
            <a href="#inicio">Termos</a>
          </div>
        </div>
      </footer>

      <a
        className="consult-button"
        href="https://wa.me/5511953836092?text=Ol%C3%A1%2C%20RK%20WEAR!%20Gostaria%20de%20receber%20atendimento."
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com uma consultora"
      >
        <span>✦</span>
        <strong>WhatsApp</strong>
      </a>

      {selectedProduct && (
        <div
          className="product-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProduct(null);
          }}
        >
          <section
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
          >
            <button
              className="product-modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Fechar detalhes da peça"
            >
              ×
            </button>

            <div className="product-modal-media">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              {selectedProduct.tag && (
                <span className="product-tag">{selectedProduct.tag}</span>
              )}
            </div>

            <div className="product-modal-copy">
              <p className="eyebrow">{selectedProduct.category}</p>
              <h2 id="product-modal-title">{selectedProduct.name}</h2>
              {selectedProduct.reference && (
                <p className="product-reference">
                  Referência {selectedProduct.reference}
                </p>
              )}
              <p className="product-description">{selectedProduct.description}</p>

              <div className="product-modal-colors">
                <span>Escolha a cor</span>
                <div className="color-picker" aria-label="Escolha a cor da peça">
                  {selectedProduct.colors.map((color) => (
                    <button
                      type="button"
                      key={color.name}
                      className={selectedColor === color.name ? "active" : ""}
                      onClick={() => setSelectedColor(color.name)}
                      aria-pressed={selectedColor === color.name}
                      aria-label={`Cor ${color.name}`}
                    >
                      <span style={{ backgroundColor: color.hex }} />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              {selectedProduct.available === false ? (
                <div className="sold-out-message">
                  Esta peça está esgotada no momento. Fale conosco para conhecer
                  opções semelhantes.
                </div>
              ) : (
                <>
                  <fieldset className="size-picker">
                    <legend>Escolha o tamanho</legend>
                    <div>
                      {selectedProduct.sizeOptions.map((size) => (
                        <button
                          type="button"
                          key={size}
                          className={selectedSize === size ? "active" : ""}
                          onClick={() => setSelectedSize(size)}
                          aria-pressed={selectedSize === size}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="product-buy-row">
                    <div className="detail-quantity" aria-label="Quantidade">
                      <button
                        type="button"
                        onClick={() =>
                          setDetailQuantity((quantity) =>
                            Math.max(1, quantity - 1),
                          )
                        }
                        aria-label="Diminuir quantidade"
                      >
                        −
                      </button>
                      <span>{detailQuantity}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setDetailQuantity((quantity) => quantity + 1)
                        }
                        aria-label="Aumentar quantidade"
                      >
                        +
                      </button>
                    </div>
                    <strong>Valor sob consulta</strong>
                  </div>

                  <button
                    className="button button-dark product-add-button"
                    onClick={() =>
                      addToCart(
                        selectedProduct,
                        selectedSize,
                        selectedColor,
                        detailQuantity,
                      )
                    }
                  >
                    Adicionar à sacola
                  </button>
                </>
              )}

              <a
                className="product-direct-contact"
                href={`https://wa.me/5511953836092?text=${encodeURIComponent(
                  `Olá, RK WEAR! Gostaria de saber mais sobre ${selectedProduct.name}.`,
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Tirar dúvida pelo WhatsApp
              </a>
              <p className="product-service-note">
                Atendimento personalizado · Envio para todo o Brasil
              </p>
            </div>
          </section>
        </div>
      )}

      <div
        className={`drawer-overlay ${cartOpen ? "is-open" : ""}`}
        onClick={() => setCartOpen(false)}
      />
      <aside
        className={`cart-drawer ${cartOpen ? "is-open" : ""}`}
        aria-label="Sua sacola"
        aria-hidden={!cartOpen}
      >
        <div className="cart-header">
          <div>
            <p className="eyebrow">Sua seleção</p>
            <h2>Sacola ({cartCount})</h2>
          </div>
          <button onClick={() => setCartOpen(false)} aria-label="Fechar sacola">
            ×
          </button>
        </div>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <span>RK</span>
            <h3>Sua sacola está leve.</h3>
            <p>Descubra peças pensadas para acompanhar muitas histórias.</p>
            <button
              className="button button-dark"
              onClick={() => setCartOpen(false)}
            >
              Explorar coleção
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <article key={`${item.id}-${item.size}-${item.color}`}>
                  <img src={item.image} alt="" />
                  <div>
                    <h3>{item.name}</h3>
                    <span>
                      Tamanho: {item.size} · Cor: {item.color}
                    </span>
                    <strong>Valor sob consulta</strong>
                    <div className="quantity">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.color, -1)
                        }
                        aria-label={`Diminuir quantidade de ${item.name}`}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.color, 1)
                        }
                        aria-label={`Aumentar quantidade de ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="cart-footer">
              <div>
                <span>Sua seleção</span>
                <strong>{cartCount} {cartCount === 1 ? "peça" : "peças"}</strong>
              </div>
              <p>Valores, cores e tamanhos são confirmados no atendimento.</p>
              <button
                className="button button-dark"
                type="button"
                onClick={openPayment}
              >
                Finalizar compra
              </button>
              <a
                className="cart-whatsapp-link"
                href={`https://wa.me/5511953836092?text=${checkoutMessage}`}
                target="_blank"
                rel="noreferrer"
              >
                Tirar dúvida pelo WhatsApp
              </a>
            </div>
          </>
        )}
      </aside>

      {paymentOpen && (
        <div
          className="payment-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPaymentOpen(false);
          }}
        >
          <section
            className="payment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-title"
          >
            <button
              className="payment-close"
              type="button"
              onClick={() => setPaymentOpen(false)}
              aria-label="Fechar formas de pagamento"
            >
              ×
            </button>

            <div className="payment-heading">
              <span className="payment-lock" aria-hidden="true">✓</span>
              <p className="eyebrow">Pagamento protegido</p>
              <h2 id="payment-title">Como você prefere pagar?</h2>
              <p>
                Escolha uma opção. A RK WEAR não pede, recebe ou armazena
                números de cartão.
              </p>
            </div>

            <div className="payment-options" role="radiogroup" aria-label="Forma de pagamento">
              <button
                type="button"
                role="radio"
                aria-checked={paymentMethod === "pix"}
                className={paymentMethod === "pix" ? "active" : ""}
                onClick={() => setPaymentMethod("pix")}
              >
                <span className="payment-option-icon">PIX</span>
                <span><strong>Pix</strong><small>Pagamento rápido</small></span>
                <i aria-hidden="true" />
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={paymentMethod === "debit"}
                className={paymentMethod === "debit" ? "active" : ""}
                onClick={() => setPaymentMethod("debit")}
              >
                <span className="payment-option-icon">▣</span>
                <span><strong>Cartão de débito</strong><small>Pagamento à vista</small></span>
                <i aria-hidden="true" />
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={paymentMethod === "credit"}
                className={paymentMethod === "credit" ? "active" : ""}
                onClick={() => setPaymentMethod("credit")}
              >
                <span className="payment-option-icon">▰</span>
                <span><strong>Cartão de crédito</strong><small>À vista ou parcelado</small></span>
                <i aria-hidden="true" />
              </button>
            </div>

            <div className="payment-security-note">
              <strong>Seus dados bancários ficam protegidos</strong>
              <p>
                Nunca envie número, validade ou código de segurança do cartão
                por mensagem. Você só deverá digitá-los na página oficial da
                instituição de pagamento.
              </p>
            </div>

            <a
              className="button button-dark payment-continue"
              href={`https://wa.me/5511953836092?text=${paymentMessage}`}
              target="_blank"
              rel="noreferrer"
            >
              Solicitar link seguro
            </a>
            <button
              className="payment-back-button"
              type="button"
              onClick={() => {
                setPaymentOpen(false);
                setCartOpen(true);
              }}
            >
              Voltar para a sacola
            </button>
            <p className="payment-provider-note">
              O pagamento somente será concluído no ambiente oficial da instituição escolhida.
            </p>
          </section>
        </div>
      )}
    </main>
  );
}
