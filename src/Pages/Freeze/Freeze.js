import classNames from 'classnames/bind';
import styles from './Freeze.module.scss';
import { MenuItems1 } from '~/layouts/components/FeaturedMenu/Menu1';
import MenuFeat from '~/layouts/components/FeaturedMenu/Menu1/Menu1';
import { StarIcons } from '~/Components/icons/icons';
import { useState } from 'react';
import { BsStar } from 'react-icons/bs';
import Product from '~/layouts/components/Product';
const cx = classNames.bind(styles);
const MENUS = [
    {
        id: 1,
        star:  <BsStar />,
        src: require('~/assets/images/sp-15-freeze-matcha.png'),
        price: '35000',
        title: 'Freeze Matcha',
        icon: <StarIcons />,
    },
    {
        id: 2,
        star:  <BsStar />,
        src: require('~/assets/images/sp-16-freeze-vietquat.jpg'),
        price: '35000',
        title: 'Freeze Việt Quất',
        icon: <StarIcons />,
    },
    {
        id: 3,
        star:  <BsStar />,
        src: require('~/assets/images/sp-18-freeze-socola.jpg'),
        price: '35000',
        title: 'Freeze Socola',
        icon: <StarIcons />,
    },
    {
        id: 4,
        star:  <BsStar />,
        src: require('~/assets/images/sp-21-freezekem.jpg'),
        price: '35000',
        title: 'Freeze kem',
        icon: <StarIcons />,
    },
    {
        id: 5,
        star:  <BsStar />,
        src: require('~/assets/images/sp-16-freeze-vietquat.jpg'),
        price: '35000',
        title: 'Freeze Việt Quất',
        icon: <StarIcons />,
    },
    {
        id: 6,
        star:  <BsStar />,
        src: require('~/assets/images/sp-18-freeze-socola.jpg'),
        price: '35000',
        title: 'Freeze Socola',
        icon: <StarIcons />,
    },
];

function Freeze() {
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
                            <MenuItems1
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

export default Freeze;
