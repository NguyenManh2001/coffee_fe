import classNames from 'classnames/bind';
import styles from './Tea.module.scss';
import MenuFeat from '~/layouts/components/FeaturedMenu/Menu1/Menu1';
import { MenuItems1 } from '~/layouts/components/FeaturedMenu/Menu1';
import { StarIcons } from '~/Components/icons/icons';
import Product from '~/layouts/components/Product';
import { useState } from 'react';
import { BsStar } from 'react-icons/bs';
const cx = classNames.bind(styles);
const MENUS = [
    {
        id: 1,
        star:  <BsStar />,
        src: require('~/assets/images/sp-8-trasen.jpg'),
        price: '35000',
        title: 'Trà Sen',
        icon: <StarIcons />,
    },
    {
        id: 2,
        star:  <BsStar />,
        src: require('~/assets/images/sp-9-travai.jpg'),
        price: '35000',
        title: 'Trà vải',
        icon: <StarIcons />,
    },
    {
        id: 3,
        star:  <BsStar />,
        src: require('~/assets/images/sp-11.jpg'),
        price: '35000',
        title: 'Trà Quất',
        icon: <StarIcons />,
    },
    {
        id: 4,
        star:  <BsStar />,
        src: require('~/assets/images/sp-14-tradao.jpg'),
        price: '35000',
        title: 'Trà đào',
        icon: <StarIcons />,
    },
    {
        id: 5,
        star:  <BsStar />,
        src: require('~/assets/images/sp-22-trachanh.jpg'),
        price: '35000',
        title: 'Trà chanh',
        icon: <StarIcons />,
    },
    {
        id: 6,
        star:  <BsStar />,
        src: require('~/assets/images/sp-8-trasen.jpg'),
        price: '35000',
        title: 'Trà đào',
        icon: <StarIcons />,
    },
];
function Tea() {
    const [product, setProduct] = useState(false);
    const [header,setHeader] = useState(1);
    const renderItems = () => {
      return MENUS.map((MENU) => {
          if(MENU.id === header){
              return(
                  <div key={header}>
                  {product ? ( 
                      <Product
                      key={header}
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

export default Tea;
