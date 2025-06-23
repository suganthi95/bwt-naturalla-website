  import type { Product } from '@/types/Home';
import { formatDistanceToNow, parseISO } from 'date-fns';
  export const formatRelativeTime = (isoDate:string)=>{
 const date = parseISO(isoDate)
 const secondsAgo = (Date.now()-date.getTime())/1000
 if (secondsAgo < 60) return "Just now";
 if (secondsAgo < 120) return "A minute ago";
 if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} minutes ago`;
 if (secondsAgo < 7200) return "An hour ago";
 if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} hours ago`;
return formatDistanceToNow(date,{addSuffix:true})
  }


  export function getDiscountedProduct(product: Product, coupon:any | null) {
  const isProductInCoupon =
    coupon?.coupon_type === "product_based" &&
    Array.isArray(coupon.product_ids) &&
    coupon.product_ids.includes(Number(product.product_id));

  let productDiscount = 0;

  if (isProductInCoupon) {
    if (coupon.discount_type === "percent") {
      productDiscount =
        (product.unit_price * product.quantity * coupon.discount) / 100;
    } else {
      productDiscount = coupon.discount;
    }
  }

  return {
    ...product,
    coupon_amount: isProductInCoupon ? Number(productDiscount) : 0,
    coupon_id: isProductInCoupon ? Number(coupon?.coupon_id) : null,
    total_amount: Math.round(product.unit_price * product.quantity - productDiscount),
    isCouponApplied: isProductInCoupon,
  };
}
