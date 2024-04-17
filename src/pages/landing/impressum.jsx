import Header from "./header";
import Footer from "./footer";

const Impressum = () => {
  return (
    <section className="flex flex-col items-center gap-20 font-['Outfit'] pt-20">
      <div className="max-w-[1200px] w-full">
        <Header />
      </div>
      <div className="flex flex-col justify-center items-center gap-16 px-[140px] pb-24 w-full max-w-[1440px]">
        <div className="flex flex-col items-center gap-4">
          <p className="text-xs font-medium text-[#163300] px-7 py-2 bg-[#ECFAE2] rounded-full">
          Rechtliche Informationen
          </p>
          <p className="text-[52px] font-semibold text-greyscale-900 text-center">
            Impressum
          </p>
          <p className="text-base font-normal text-greyscale-900">
          Zuletzt aktualisiert: 12.11.2023
          </p>
        </div>
        <div>
        <div className="flex flex-col justify-center items-center gap-12">
            <div className="flex flex-col items-start gap-8">
                <div className="flex flex-col gap-5 items-start text-lg font-normal text-greyscale-400">
                  <p>Webmetic ist ein Projekt der Intent GmbH</p>
                    <p className="text-[22px] font-bold text-greyscale-900">Angaben gemäß § 5 TMG:</p>
                    <p>Intent GmbH<br />Orionweg 5<br />85609 Aschheim</p>
                    <p className="text-[22px] font-bold text-greyscale-900">Kontakt:</p>
                    <p>Telefon: +49 89 2155 4438<br />E-Mail: mail@webmetic.de</p>

                    <p className="text-[22px] font-bold text-greyscale-900">Rechtliche Angaben:</p>
                    <p>Vertretungsberechtiger Geschäftsführer: Yannik Süß<br />Registergericht: Amtsgericht München<br />HRB: 222605</p>

                    <p>Umsatzsteuer-ID:<br />
                    Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: DE305338170</p>

                    <p className="text-[22px] font-bold text-greyscale-900">Weitere Angaben:</p>
                    <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="http://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">http://ec.europa.eu/consumers/odr</a><br />Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
                    <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

                    <p className="text-[22px] font-bold text-greyscale-900">Haftungsausschluss (Disclaimer):</p>
                    <strong>Haftung für Inhalte</strong>
                    <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>

                    <strong>Haftung für Links</strong>
                    <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>

                    <strong>Urheberrecht</strong>
                    <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
                  </div>
              </div>
          </div>
      </div></div>
      <Footer />
      </section>
  );
};

export default Impressum;
