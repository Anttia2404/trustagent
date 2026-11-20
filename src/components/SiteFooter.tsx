import { BrandMark } from './BrandMark';
import { Reveal } from './Reveal';

const exploreLinks = [
  { label: 'Agent pháp lý', href: '#agents' },
  { label: 'Niềm tin trên chuỗi', href: '#infrastructure' },
  { label: 'Biên nhận', href: '#evidence' },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <Reveal className="footer-brand-column">
            <a href="#top" className="brand-lockup footer-brand" aria-label="Trang chủ TrustAgent">
              <BrandMark size={42} />
              <span>TrustAgent</span>
            </a>
            <p className="footer-description">Tra cứu pháp luật Việt Nam,<br />có nguồn để đối chiếu.</p>
          </Reveal>

          <Reveal className="footer-navigation" delay={0.08}>
            <nav className="footer-nav" aria-label="Khám phá TrustAgent">
              <p className="footer-nav-title">Khám phá</p>
              <ul>{exploreLinks.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
            </nav>
          </Reveal>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© {new Date().getFullYear()} TrustAgent</p>
          <p className="footer-legal">TrustAgent cung cấp thông tin pháp luật tham khảo, không thay thế tư vấn của chuyên gia pháp lý.</p>
        </div>
      </div>
    </footer>
  );
}
