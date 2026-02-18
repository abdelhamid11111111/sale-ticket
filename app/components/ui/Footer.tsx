import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-12 bg-slate-100 dark:bg-slate-900 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">
                TicketFlow
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Discover, explore, and buy tickets for events you love.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">
                Follow Us
              </h4>
              <div className="flex gap-4 text-white">
                <a href="#" className="hover:text-primary transition-colors">
                  <span className="material-icons">facebook</span>
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <span className="material-icons">twitter</span>
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  <span className="material-icons">instagram</span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            © 2026 TicketFlow. All rights reserved.
          </div>
        </footer>
  )
}

export default Footer