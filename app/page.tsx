"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  tag?: string;
  colors: string[];
};

const products: Product[] = [
  {
    id: 1,
    name: "Blazer Aurora",
    category: "Alfaiataria",
    price: 489,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=88",
    tag: "Mais vendido",
    colors: ["#cbb8a1", "#1d1c1a"],
  },
  {
    id: 2,
    name: "Vestido Serena",
    category: "Noite",
    price: 459,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=88",
    tag: "Novo",
    colors: ["#342d2a", "#a66f63"],
  },
  {
    id: 3,
    name: "Camisa Lumière",
    category: "Essenciais",
    price: 259,
    image:
      "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=900&q=88",
    colors: ["#f2eee6", "#8d7566"],
  },
  {
    id: 4,
    name: "Calça Riviera",
    category: "Alfaiataria",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&w=900&q=88",
    colors: ["#b7a58f", "#20201f"],
  },
  {
    id: 5,
    name: "Tricot Siena",
    category: "Essenciais",
    price: 289,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=88",
    colors: ["#d6c9b8", "#7f6a59"],
  },
  {
    id: 6,
    name: "Vestido Íris",
    category: "Noite",
    price: 529,
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=88",
    tag: "Edição limitada",
    colors: ["#171716", "#86605a"],
  },
  {
    id: 7,
    name: "Colete Milano",
    category: "Alfaiataria",
    price: 319,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=88",
    colors: ["#c8b9a6", "#2b2926"],
  },
  {
    id: 8,
    name: "Saia Essenza",
    category: "Essenciais",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=88",
    colors: ["#8c7663", "#d9d0c3"],
  },
];

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
});

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
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  function addToCart(product: Product) {
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
        <span>Frete grátis em compras acima de R$ 499</span>
        <span className="announcement-extra">
          Primeira troca gratuita · 5% no Pix
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
            Sacola <strong>{cartCount}</strong>
          </button>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light">Coleção Essenza · Inverno 2026</p>
          <h1 id="hero-title">
            Elegância que
            <br />
            acompanha você.
          </h1>
          <p className="hero-copy">
            Peças autorais, tecidos que abraçam e uma alfaiataria desenhada para
            atravessar temporadas.
          </p>
          <div className="hero-actions">
            <a className="button button-light" href="#colecao">
              Conhecer a coleção
            </a>
            <a className="text-link light-link" href="#manifesto">
              Nossa história <span>↗</span>
            </a>
          </div>
        </div>
        <div className="hero-index">
          <span>01</span>
          <i />
          <span>04</span>
        </div>
      </section>

      <section className="benefits" aria-label="Benefícios">
        <div>
          <strong>Envio cuidadoso</strong>
          <span>Embalado à mão, com rastreio</span>
        </div>
        <div>
          <strong>Compra segura</strong>
          <span>Proteção em todas as etapas</span>
        </div>
        <div>
          <strong>Atendimento humano</strong>
          <span>Consultoria antes e depois da compra</span>
        </div>
      </section>

      <section className="collection section" id="colecao">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Curadoria da estação</p>
            <h2>Peças para ficar.</h2>
          </div>
          <p>
            Uma seleção enxuta de formas precisas, materiais táteis e cores que
            conversam entre si.
          </p>
        </div>

        <div className="filters" aria-label="Filtrar coleção">
          {["Todos", "Essenciais", "Alfaiataria", "Noite"].map((item) => (
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
                  aria-label={`Adicionar ${product.name} à sacola`}
                >
                  Adicionar à sacola
                </button>
              </div>
              <div className="product-info">
                <div>
                  <h3>{product.name}</h3>
                  <span>{product.category}</span>
                </div>
                <strong>{currency.format(product.price)}</strong>
              </div>
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
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=90"
            alt="Mulher usando blazer de alfaiataria em um ensaio de moda"
            loading="lazy"
          />
        </div>
        <div className="editorial-copy">
          <p className="eyebrow">Alfaiataria sem rigidez</p>
          <h2>Estrutura por fora. Leveza por dentro.</h2>
          <p>
            O corte impecável encontra tecidos macios e movimentos naturais.
            Para entrar em uma reunião, sair para jantar e continuar sendo você
            em cada cenário.
          </p>
          <a className="button button-dark" href="#colecao">
            Descobrir alfaiataria
          </a>
          <span className="editorial-number">02 / 04</span>
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
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=88"
              alt="Curadoria de roupas em uma loja sofisticada"
              loading="lazy"
            />
            <figcaption>
              <span>01</span>
              <strong>Neutros extraordinários</strong>
            </figcaption>
          </figure>
          <figure>
            <img
              src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=88"
              alt="Arara com peças em tons neutros"
              loading="lazy"
            />
            <figcaption>
              <span>02</span>
              <strong>Texturas da estação</strong>
            </figcaption>
          </figure>
          <figure>
            <img
              src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=88"
              alt="Seleção de peças de moda contemporânea"
              loading="lazy"
            />
            <figcaption>
              <span>03</span>
              <strong>Camadas inteligentes</strong>
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
          Design brasileiro em pequenas produções, acabamento próximo e
          materiais escolhidos para durar.
        </p>
        <a className="text-link light-link" href="#atendimento">
          Conheça a RK WEAR <span>↗</span>
        </a>
      </section>

      <section className="testimonials section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Experiências reais</p>
            <h2>Quem veste, conta.</h2>
          </div>
          <div className="rating">
            <strong>4,9</strong>
            <span>★★★★★</span>
            <small>Mais de 280 avaliações</small>
          </div>
        </div>
        <div className="testimonial-grid">
          <article>
            <span>★★★★★</span>
            <p>
              “O blazer veste como se tivesse sido feito para mim. A embalagem,
              o cuidado e o atendimento transformaram a compra em experiência.”
            </p>
            <strong>Marina F.</strong>
            <small>São Paulo, SP · Compra verificada</small>
          </article>
          <article>
            <span>★★★★★</span>
            <p>
              “Peças elegantes sem parecer que estou fantasiada. Uso no trabalho
              e no fim de semana. É exatamente o tipo de marca que eu procurava.”
            </p>
            <strong>Camila R.</strong>
            <small>Belo Horizonte, MG · Compra verificada</small>
          </article>
          <article>
            <span>★★★★★</span>
            <p>
              “Tive dúvida no tamanho e fui atendida por uma pessoa de verdade.
              Chegou perfeito, antes do prazo, com um perfume maravilhoso.”
            </p>
            <strong>Luiza A.</strong>
            <small>Curitiba, PR · Compra verificada</small>
          </article>
        </div>
      </section>

      <section className="service" id="atendimento">
        <div className="service-image">
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=88"
            alt="Arara de roupas cuidadosamente selecionadas"
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
            <a href="#colecao">Essenciais</a>
            <a href="#colecao">Alfaiataria</a>
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
                    <span>Tamanho M · Cor selecionada</span>
                    <strong>{currency.format(item.price)}</strong>
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
                <span>Subtotal</span>
                <strong>{currency.format(cartTotal)}</strong>
              </div>
              <p>Frete calculado na próxima etapa.</p>
              <button
                className="button button-dark"
                onClick={() =>
                  setNotice(
                    "Sua seleção está pronta. Uma consultora pode finalizar o pedido com você.",
                  )
                }
              >
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </aside>
    </main>
  );
}
