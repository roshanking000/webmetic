import Header from "./header";
import Footer from "./footer";

const Datenschutzerklaerung = () => {
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
            AGB
          </p>
          <p className="text-base font-normal text-greyscale-900">
          Zuletzt aktualisiert: 15.11.2023
          </p>
        </div>
        <div className="w-full h-[1px] bg-[#D4D4D4]"></div>
        <div className="flex flex-col justify-center items-center gap-12">
          <div className="flex flex-col items-start gap-[2px] text-lg font-normal text-greyscale-400">

          <p class="pt-4 text-[22px] font-bold text-greyscale-900">1. Anwendungsbereich</p>
          <p>Die vorliegenden Bedingungen sind maßgeblich für die Nutzung von Webmetic, einem innovativen Webanalyse-Service der Intent GmbH. Sie sind bindend für alle Geschäftsbeziehungen zwischen Intent GmbH und den Nutzern von Webmetic, sowohl für aktuelle als auch für zukünftige Geschäfte.</p>

          <p class="pt-4 text-[22px] font-bold text-greyscale-900">2. Dienstleistungen</p>
          <p>Webmetic bietet umfassende und detaillierte Analysefunktionen für Websites, ermöglicht durch fortschrittliche Tracking-Scripts. Diese Dienste sind über einen speziell gesicherten Bereich zugänglich, der Nutzern eine effiziente und zuverlässige Nutzung ermöglicht.</p>

          <p class="pt-4 text-[22px] font-bold text-greyscale-900">3. Registrierung und Sicherheit</p>
          <p>Die Registrierung ist ein notwendiger Schritt, um Zugang zu den vielfältigen Funktionen von Webmetic zu erhalten. Nutzer müssen bei der Registrierung relevante Unternehmens- und Kontaktdaten sowie ihre Zahlungsinformationen angeben. Die Nutzer tragen die volle Verantwortung für die Sicherheit und Vertraulichkeit ihres Passworts und haften für eventuelle Missbrauchsfälle.</p>

          <p class="pt-4 text-[22px] font-bold text-greyscale-900">4. Verfügbarkeit</p>
          <p>Intent GmbH zielt darauf ab, Webmetic mit einer hohen Verfügbarkeit von 99.9% im Monatsdurchschnitt anzubieten. Ausgenommen von dieser Verfügbarkeitsgarantie sind Fälle von höherer Gewalt, Fehlbedienungen durch den Kunden und Zeiten geplanter Wartungsarbeiten.</p>

          <p class="pt-4 text-[22px] font-bold text-greyscale-900">5. Support und Reaktionszeiten</p>
          <p>Intent GmbH stellt einen umfassenden Support zur Verfügung, um bei jeglichen Problemen mit Webmetic schnell und effizient helfen zu können. Kunden müssen eventuelle Probleme unverzüglich melden, damit sie schnellst möglich behoben werden können. Der Support ist werktags erreichbar, und Intent GmbH reagiert in der Regel innerhalb eines Arbeitstages auf Supportanfragen.</p>

          <p class="pt-4 text-[22px] font-bold text-greyscale-900">6. Urheberrechte</p>
          <p>Die von Webmetic generierten Analyseergebnisse sind ausschließlich für die interne Verwendung durch den Nutzer bestimmt. Jegliche Weitergabe dieser Daten oder der Software an Dritte, sowie jegliche Form der Vervielfältigung außerhalb des vertraglich vereinbarten Rahmens, ist strikt untersagt.</p>

          <p class="pt-4 text-[22px] font-bold text-greyscale-900">7. Vergütung</p>
          <p>Intent GmbH bietet eine 30-tägige kostenfreie Testversion von Webmetic an. Nach Ablauf dieser Frist können Nutzer aus verschiedenen Lizenzmodellen wählen. Die Zahlung der monatlichen Gebühren ist jeweils zu Beginn des Abrechnungsmonats fällig und kann über diverse Zahlungsmethoden erfolgen.</p>

          <p class="pt-4 text-[22px] font-bold text-greyscale-900">8. Vertragslaufzeit und Kündigung</p>
          <p>Die kostenfreie Testversion von Webmetic endet automatisch nach 30 Tagen. Anschließend verlängert sich der Vertrag automatisch um die gewählte Vertragslaufzeit, es sei denn, er wird mit einer Frist von 30 Tagen gekündigt.</p>

          <p class="pt-4 text-[22px] font-bold text-greyscale-900">9. Haftung</p>
          <p>Die Haftung der Intent GmbH ist auf Fälle von Vorsatz oder grober Fahrlässigkeit beschränkt. In diesen Fällen haftet die Intent GmbH für typischerweise vorhersehbare Schäden. In allen anderen Fällen ist die Haftung ausgeschlossen, sofern nicht durch gesetzliche Bestimmungen anders geregelt.</p>

          <p class="pt-4 text-[22px] font-bold text-greyscale-900">10. Rechte Dritter</p>
          <p>Die Intent GmbH garantiert, dass die Nutzung von Webmetic keine Rechte Dritter verletzt. Sollten Dritte dennoch Rechte geltend machen, verpflichtet sich der Nutzer, Intent GmbH unverzüglich zu informieren und bei der Klärung der Angelegenheit zu unterstützen.</p>

          <p class="pt-4 text-[22px] font-bold text-greyscale-900">11. Datenschutz</p>
          <p>Webmetic entspricht allen relevanten Datenschutzgesetzen. Nutzer sind selbst verantwortlich für die datenschutzkonforme Nutzung der Daten und müssen bei der Erhebung personenbezogener Daten die notwendigen Einwilligungen einholen.</p>

          <p class="pt-4 text-[22px] font-bold text-greyscale-900">12. Änderungen der Bedingungen</p>
          <p>Intent GmbH behält sich das Recht vor, die Bedingungen und die Vergütung für Webmetic zu ändern. Änderungen werden den Nutzern schriftlich mitgeteilt und gelten als akzeptiert, wenn nicht innerhalb eines Monats Widerspruch eingelegt wird. Bei Widerspruch kann Intent GmbH den Vertrag mit einer einmonatigen Frist kündigen.</p>

          <p class="pt-4 text-[22px] font-bold text-greyscale-900">13. Zahlungen</p>
          <p>Rechnungen der Intent GmbH sind unmittelbar nach Erhalt zu begleichen, ohne jegliche Abzüge. Bei Zahlungsverzug fallen Verzugszinsen in Höhe von 5% über dem Basiszins der EZB an, sofern kein höherer Schaden nachgewiesen wird. Die Intent GmbH behält sich das Recht vor, Vorauskasse zu verlangen und erst nach vollständigem Zahlungseingang die Leistungen zu erbringen.</p>

          <p class="pt-4 text-[22px] font-bold text-greyscale-900">14. Referenzrecht</p>
          <p>Nach Beauftragung erklärt sich der Auftraggeber damit einverstanden, als Referenzkunde der Intent GmbH genannt zu werden. Die Intent GmbH darf das Logo des Auftraggebers für Marketingzwecke verwenden.</p>

          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Datenschutzerklaerung;
