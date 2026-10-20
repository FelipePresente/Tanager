import { useState, type FormEvent } from 'react'
import { ArrowRight, BookOpen, Clock3, Mail } from 'lucide-react'
import { mockNews } from '../data/mockData'
import { PageTitle } from '../components/UI'

export default function NewsPage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const featured = mockNews[0]

  const handleScrollToNews = () => {
    document.getElementById('latest-news')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubscribe = (event: FormEvent) => {
    event.preventDefault()
    if (email.includes('@')) {
      setSubscribed(true)
    }
  }

  return (
    <>
      <PageTitle
        eyebrow="Histórias da cidade"
        title="Notícias & descobertas"
        description="O que acontece em Caraguá, contado por quem vive aqui."
      />

      <section className="news-featured">
        <img src={featured.image} alt="Público em um evento musical ao ar livre" />

        <div className="news-featured-copy">
          <span className="news-category-tag">{featured.category}</span>
          <span className="news-meta">
            <Clock3 size={14} />
            {featured.minutes} min de leitura · {featured.date}
          </span>
          <h2>{featured.title}</h2>
          <p>{featured.excerpt}</p>
          <button className="text-link" onClick={handleScrollToNews}>
            Ler história <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <section className="content-section news-section" id="latest-news">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Daqui para você</p>
            <h2>Últimas da cidade</h2>
          </div>
          <span className="news-section-label">
            <BookOpen size={15} /> Boas histórias locais
          </span>
        </div>

        <div className="news-grid">
          {mockNews.slice(1).map((item) => (
            <article key={item.id} className="news-card">
              <img src={item.image} alt="" />

              <div className="news-card-copy">
                <div className="news-card-top">
                  <span className="news-category-tag">{item.category}</span>
                  <span>{item.minutes} min</span>
                </div>

                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>

                <div className="news-card-bottom">
                  <time>{item.date}</time>
                  <button
                    className="news-read-button"
                    onClick={(event) => {
                      const article = event.currentTarget.closest('article')
                      article?.classList.toggle('expanded')
                    }}
                  >
                    Continuar lendo <ArrowRight size={14} />
                  </button>
                </div>

                <div className="news-extra">
                  <p>
                    Caraguá se transforma quando a gente ocupa a cidade. Acompanhe a programação
                    completa no Tanager e encontre novas formas de fazer parte dessa história.
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="newsletter-panel">
        <div className="newsletter-icon">
          <Mail size={21} />
        </div>

        <div className="newsletter-copy">
          <span className="eyebrow">A cidade no seu e-mail</span>
          <h2>Receba boas novas de Caraguá.</h2>
          <p>Uma seleção de eventos e histórias locais, sem complicação.</p>
        </div>

        {subscribed ? (
          <div className="subscribe-success">Pronto! Você entrou para a lista 💌</div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <label className="sr-only" htmlFor="newsletter-email">
              Seu e-mail
            </label>
            <input
              id="newsletter-email"
              required
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button className="button button-primary">
              Quero receber <ArrowRight size={15} />
            </button>
          </form>
        )}
      </section>
    </>
  )
}
