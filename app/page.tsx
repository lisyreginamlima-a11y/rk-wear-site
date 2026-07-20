"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  image: string;
  tag?: string;
  colors: string[];
  reference?: string;
  sizes?: string;
  available?: boolean;
};

const products: Product[] = [
  {
    id: 1,
    name: "Conjunto Fitness Black",
    category: "RK Fitness",
    image: "/instagram/fitness-black.jpg",
    tag: "Lançamento",
    colors: ["#151515"],
    sizes: "Consulte tamanhos",
  },
  {
    id: 2,
    name: "Calça Courino Zara",
    category: "Essência",
    image: "/instagram/calca-courino-zara.jpg",
    tag: "Ref. 0576",
    colors: ["#111111"],
    reference: "0576",
    sizes: "P · M · G",
  },
  {
    id: 3,
    name: "Blusa Aura + Saia Brisa",
    category: "Essência",
    image: "/instagram/aura-brisa-marrom.jpg",
    tag: "Coleção Essência",
    colors: ["#684a38", "#171717", "#f3eee5", "#702f3a"],
    reference: "Aura 045 · Brisa 048",
    sizes: "P · M · G",
  },
  {
    id: 4,
    name: "Conjunto Charlotte Xadrez",
    category: "Essência",
    image: "/instagram/charlotte-xadrez.jpg",
    tag: "Ref. 040",
    colors: ["#1d1d1d", "#8a837b"],
    reference: "040",
    sizes: "P · M",
  },
  {
    id: 5,
    name: "Conjunto Renda Cacau",
    category: "Conjuntos",
    image: "/instagram/conjunto-renda-cacau.jpg",
    colors: ["#744526"],
    sizes: "Consulte tamanhos",
  },
  {
    id: 6,
    name: "Conjunto Lilás",
    category: "Conjuntos",
    image: "/instagram/conjunto-lilas.jpg",
    tag: "Edição limitada",
    colors: ["#d8bee1"],
    sizes: "Consulte tamanhos",
  },
  {
    id: 7,
    name: "Vestido Brasil",
    category: "Vestidos",
    image: "/instagram/vestido-brasil.jpg",
    tag: "Esgotado",
    colors: ["#e3d229", "#386b45"],
    sizes: "Edição exclusiva",
    available: false,
  },
];

export default function Home() {
  const [category, setCategory] = useState("Todos");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(
    () =>
      category === "Todos"
        ? products
        : products.filter((product) => product.category === category),
    [category],
  );

  const cartItems = products
    .filter((product) => cart[product.id])
    .map((product) => ({ ...product, quantity: cart[product.id] }));
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const checkoutMessage = encodeURIComponent(
    `Olá, RK WEAR! Tenho interesse nestas peças:\n${cartItems
      .map((item) => `• ${item.name} (${item.quantity}x)`)
      .join("\n")}\n\nPode me informar valores, cores e tamanhos disponíveis?`,
  );

  function addToCart(product: Product) {
    if (product.available === false) return;
    setCart((current) => ({
      ...current,
      [product.id]: (current[product.id] || 0) + 1,
    }));
    setCartOpen(true);
  }

  function updateQuantity(id: number, change: number) {
    setCart((current) => {
      const next = Math.max(0, (current[id] || 0) + change);
      const updated = { ...current, [id]: next };
      if (next === 0) delete updated[id];
      return updated;
    });
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
            className="text-action"
            onClick={() => setCartOpen(true)}
            aria-label={`Abrir sacola com ${cartCount} itens`}
          >
            Seleção <strong>{cartCount}</strong>
          </button>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <img
          className="hero-profile-image"
          src="/instagram/rk-profile.jpg"
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
          {["Todos", "Essência", "RK Fitness", "Conjuntos", "Vestidos"].map((item) => (
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
                <img src={product.image} alt={product.name} loading="lazy" />
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
                  onClick={() => addToCart(product)}
                  disabled={product.available === false}
                  aria-label={
                    product.available === false
                      ? `${product.name} esgotado`
                      : `Adicionar ${product.name} à seleção`
                  }
                >
                  {product.available === false
                    ? "Esgotado"
                    : "Tenho interesse"}
                </button>
              </div>
              <div className="product-info">
                <div>
                  <h3>{product.name}</h3>
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
                  <span key={color} style={{ backgroundColor: color }} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="editorial" id="novidades">
        <div className="editorial-image">
          <img
            src="/instagram/aura-brisa-marrom.jpg"
            alt="Blusa Aura e Saia Brisa da coleção Essência"
            loading="lazy"
          />
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

      <section className="lookbook section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">Lookbook</p>
            <h2>Vista o seu ritmo.</h2>
          </div>
          <a className="text-link" href="#colecao">
            Ver coleção completa <span>↗</span>
          </a>
        </div>
        <div className="lookbook-grid">
          <figure className="lookbook-large">
            <img
              src="/instagram/charlotte-xadrez.jpg"
              alt="Conjunto Charlotte Xadrez da RK WEAR"
              loading="lazy"
            />
            <figcaption>
              <span>01</span>
              <strong>Charlotte Xadrez</strong>
            </figcaption>
          </figure>
          <figure>
            <img
              src="/instagram/conjunto-lilas.jpg"
              alt="Conjunto lilás da RK WEAR"
              loading="lazy"
            />
            <figcaption>
              <span>02</span>
              <strong>Delicadeza marcante</strong>
            </figcaption>
          </figure>
          <figure>
            <img
              src="/instagram/conjunto-renda-cacau.jpg"
              alt="Conjunto de renda em tom cacau da RK WEAR"
              loading="lazy"
            />
            <figcaption>
              <span>03</span>
              <strong>Renda Cacau</strong>
            </figcaption>
          </figure>
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
            <span>ELAS USAM</span>
            <p>
              Veja clientes reais usando suas escolhas RK WEAR e encontre novas
              formas de combinar cada peça.
            </p>
            <strong>Looks reais</strong>
            <small>Destaque do Instagram</small>
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
        <div className="service-image">
          <img
            src="/instagram/fitness-black.jpg"
            alt="Conjunto Fitness Black da RK WEAR"
            loading="lazy"
          />
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
                <article key={item.id}>
                  <img src={item.image} alt="" />
                  <div>
                    <h3>{item.name}</h3>
                    <span>{item.sizes}</span>
                    <strong>Valor sob consulta</strong>
                    <div className="quantity">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label={`Diminuir quantidade de ${item.name}`}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
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
              <a
                className="button button-dark"
                href={`https://wa.me/5511953836092?text=${checkoutMessage}`}
                target="_blank"
                rel="noreferrer"
              >
                Consultar no WhatsApp
              </a>
            </div>
          </>
        )}
      </aside>
    </main>
  );
}
