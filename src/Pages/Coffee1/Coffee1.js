import classNames from 'classnames/bind';
import styles from './Coffee1.module.scss';
import { MenuItems } from '~/layouts/components/FeaturedMenu/Menu';
import { StarIcons } from '~/Components/icons/icons';
import { useState } from 'react';
import Product from '~/layouts/components/Product';
import { BsStar } from 'react-icons/bs';
import MenuFeat from '~/layouts/components/FeaturedMenu/Menu/Menu';
const cx = classNames.bind(styles);
const MENUS = [
    {
        id: 1,
        star:  <BsStar />,
        src: require('~/assets/images/sp-23.jpg'),
        price: '65000',
        title: 'Cà phê gói',
        icon: <StarIcons />,
    },
    {
        id: 2,
        star:  <BsStar />,
        src: require('~/assets/images/sp-24.jpg'),
        price: '80000',
        title: 'Cà phê hòa tan',
        icon: <StarIcons />,
    },
    {
        id: 3,
        star:  <BsStar />,
        src: require('~/assets/images/sp-25.jpg'),
        price: '95000',
        title: 'Cà phê Roast',
        icon: <StarIcons />,
    },
];
function Coffee1() {
    const [product, setProduct] = useState(false);
    const [header,setHeader] = useState(1);
    const renderItems = () => {
      return MENUS.map((MENU) => {
          if(MENU.id === header){
              return(
                <div key={header}>
                  {product ? ( 
                      <Product
                      key={MENU.id}
                      src={MENU.src}
                      name={MENU.title}
                      cart={MENU.price}
                      />
                      ) : (
                         <div></div>
                      )}
                      </div>
              )
          }
      })
  }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content-right')}>
                <div className={cx('main-right')}>
                    <MenuFeat className={cx('menu')}>
                        {MENUS.map((MENU) => (
                            <MenuItems
                                key={MENU.id}
                                star={MENU.star}
                                src={MENU.src}
                                price={MENU.price}
                                title={MENU.title}
                                icon={MENU.icon}
                                onClick={() => {
                                    setProduct(!product);
                                    setHeader(MENU.id);
                                }}
                            />
                        ))}
                    </MenuFeat>
                </div>
            </div>
           {renderItems()}
        </div>
    );
}

export default Coffee1;
