import FestivalSpecial from './FestivalSpecial';
import ServiceDetails from './ServiceDetails';
import Testimonials from './Testimonials';
import DesignerCollection from './DesignerCollection';
import Categories from '../Categories';
import FeaturedBlog from './FeaturedBlog';
import Calendar from './Calendar';

const IndexPage = () => {
  return (
    <div className='min-h-screen'>
      <Calendar />
      <Categories />
      <DesignerCollection />
      <FestivalSpecial />
      <Testimonials />
      <FeaturedBlog />
      <ServiceDetails />
    </div>
  )
}
export default IndexPage