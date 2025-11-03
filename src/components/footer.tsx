import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-12 mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          <div>
            <h3 className="font-bold text-lg mb-4">
              SORT<span className="text-teal">I</span>S
              <span className="text-sm text-muted-gray">IQ</span>
            </h3>
            <p className="text-sm text-muted-gray">
              Smarter Health Insurance Leads. Stronger Books.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/leads"
                  className="text-sm text-muted-gray hover:text-txt transition-colors"
                >
                  Leads
                </Link>
              </li>
              <li>
                <Link
                  href="/proof"
                  className="text-sm text-muted-gray hover:text-txt transition-colors"
                >
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/start"
                  className="text-sm text-muted-gray hover:text-txt transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-muted-gray hover:text-txt transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-sm text-muted-gray hover:text-txt transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-muted-gray">
          <p>&copy; {currentYear} SortisIQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
