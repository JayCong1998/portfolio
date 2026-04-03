import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.productPage}>
      <div className={styles.navigation}>
        <p className={styles.worldPeas}>World Peas</p>
        <p className={styles.shop}>Shop</p>
        <p className={styles.newstand}>Newstand</p>
        <p className={styles.newstand}>Who we are</p>
        <p className={styles.newstand}>My profile</p>
        <div className={styles.cartButton}>
          <p className={styles.basket3}>Basket (3)</p>
        </div>
      </div>
      <div className={styles.pageHeading}>
        <div className={styles.autoWrapper}>
          <p className={styles.produce}>Produce</p>
          <p className={styles.freshAugust2120233}>
            <span className={styles.freshAugust212023}>Fresh</span>
            <span className={styles.freshAugust2120232}>
              &nbsp;&nbsp;—&nbsp;&nbsp;August 21, 2023
            </span>
          </p>
          <div className={styles.defaultChip}>
            <p className={styles.basket3}>Default</p>
          </div>
          <div className={styles.aZChip}>
            <p className={styles.aZ}>A-Z</p>
          </div>
          <div className={styles.aZChip}>
            <p className={styles.aZ}>List view</p>
          </div>
        </div>
        <div className={styles.divider} />
      </div>
      <div className={styles.autoWrapper2}>
        <div className={styles.tomato}>
          <img
            src="../image/mn5te6n3-qovieq8.png"
            className={styles.edONeilAvvdZlhDowAUn}
          />
          <p className={styles.heirloomTomato}>Heirloom tomato</p>
          <p className={styles.a599Lb}>$5.99 / lb</p>
          <p className={styles.grownInSanJuanCapist}>
            Grown in San Juan Capistrano, CA
          </p>
        </div>
        <div className={styles.tomato}>
          <img
            src="../image/mn5te6n3-edeguoa.png"
            className={styles.edONeilAvvdZlhDowAUn}
          />
          <p className={styles.heirloomTomato}>Organic ginger</p>
          <p className={styles.a599Lb}>$12.99 / lb</p>
          <p className={styles.grownInSanJuanCapist}>
            Grown in Huntington Beach, CA
          </p>
        </div>
      </div>
    </div>
  );
}

export default Component;
