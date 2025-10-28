import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h2 className="text-2xl font-bold text-primary mb-4">
                            vibe<span className="text-secondary">Desi</span>
                        </h2>
                        <p className="text-gray-400">
                            Traditional Rajasthani ethnic wear for the modern woman. Quality clothing that celebrates heritage.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/products" className="text-gray-400 hover:text-primary transition-colors">Products</Link></li>
                            <li><Link to="/products?category=kurti" className="text-gray-400 hover:text-primary transition-colors">Kurtis</Link></li>
                            <li><Link to="/products?category=dupatta-set" className="text-gray-400 hover:text-primary transition-colors">Dupatta Sets</Link></li>
                            <li><Link to="/products?category=salwar-suit" className="text-gray-400 hover:text-primary transition-colors">Salwar Suits</Link></li>
                            <li><Link to="/products?category=combo-set" className="text-gray-400 hover:text-primary transition-colors">Combo Sets</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Contact Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Shipping Info</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Returns</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Facebook size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Instagram size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Twitter size={24} />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                <Mail size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 vibeDesi. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}


