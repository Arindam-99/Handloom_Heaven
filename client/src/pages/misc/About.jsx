import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const About = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-700 to-secondary-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Arunachal Pradesh</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            The land of dawn-lit mountains, home to 26 major tribes, each with unique traditions, crafts, and stories woven into every product we share.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-800 mb-4">Our Heritage, Your Home</h2>
              <p className="text-stone-600 mb-4">
                Arunachal Heritage Marketplace bridges the gap between the skilled artisans of Arunachal Pradesh and customers across India. Every product on our platform is authentically handcrafted by local artisans.
              </p>
              <p className="text-stone-600 mb-6">
                We work directly with communities to ensure fair prices for artisans while bringing you genuine products that carry centuries of cultural heritage.
              </p>
              <Link to="/shop" className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 inline-flex items-center gap-2">
                Explore Products <FiArrowRight />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-primary-600">26+</p>
                  <p className="text-sm text-stone-600">Tribes</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-primary-600">100+</p>
                  <p className="text-sm text-stone-600">Artisans</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-primary-600">500+</p>
                  <p className="text-sm text-stone-600">Products</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-primary-600">83K</p>
                  <p className="text-sm text-stone-600">Sq km Area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tribes */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-stone-800 text-center mb-10">Tribes & Communities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Monpa', region: 'Tawang & West Kameng', craft: 'Thangka painting, bamboo weaving' },
              { name: 'Apatani', region: 'Lower Subansiri', craft: 'Rice farming, traditional weaving' },
              { name: 'Nishi', region: 'Lower Subansiri & Papum Pare', craft: 'Cane & bamboo crafts' },
              { name: 'Galo', region: 'West Siang', craft: 'Traditional handloom, wood carving' },
              { name: 'Adi', region: 'East & West Siang', craft: 'Weaving, beadwork' },
              { name: 'Nocte', region: 'Tirap & Changlang', craft: 'Bamboo baskets, pottery' }
            ].map((tribe) => (
              <div key={tribe.name} className="bg-white rounded-xl p-5 border border-stone-100">
                <h3 className="font-bold text-stone-800 text-lg">{tribe.name}</h3>
                <p className="text-sm text-primary-600 mb-2">{tribe.region}</p>
                <p className="text-sm text-stone-600">{tribe.craft}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-stone-800 mb-6">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Preserve Heritage', desc: 'Keep traditional crafts alive by connecting artisans to modern markets.' },
              { title: 'Empower Artisans', desc: 'Provide fair wages and direct access to customers without middlemen.' },
              { title: 'Sustainable Craft', desc: 'Promote eco-friendly, handmade products over mass manufacturing.' }
            ].map((item) => (
              <div key={item.title}>
                <h3 className="font-bold text-stone-800 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
