import styles from './CocktailCardSkeleton.module.css';
import skeletonStyles from '../atoms/Skeleton.module.css';

const CocktailCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={`${styles.imageContainer} ${skeletonStyles.skeleton}`}></div>
      <div className={styles.content}>
        <div className={`${styles.title} ${skeletonStyles.skeleton}`}></div>
        <div className={styles.badges}>
          <div className={`${styles.badge} ${skeletonStyles.skeleton}`}></div>
          <div className={`${styles.badge} ${skeletonStyles.skeleton}`}></div>
        </div>
      </div>
    </div>
  );
};

export default CocktailCardSkeleton;