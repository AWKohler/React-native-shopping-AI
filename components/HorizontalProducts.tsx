// import React from 'react';
// import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';

// interface Product {
//   product_id: string;
//   title: string;
//   price: string;
//   old_price?: string;
//   rating?: number;
//   reviews?: number;
//   snippet?: string;
//   source?: string;
//   thumbnail?: string;
//   tag?: string;
// }

// // 1) Accept an optional callback for tapping a product
// type HorizontalProductsProps = {
//   products: Product[];
//   onProductPress?: (productId: string) => void;
// };

// export default function HorizontalProducts({ products, onProductPress }: HorizontalProductsProps) {
//   // 2) Trigger the parent callback if provided
//   const handlePress = (productId: string) => {
//     if (onProductPress) {
//       onProductPress(productId);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {products.map((product) => (
//           <TouchableOpacity
//             key={product.product_id}
//             onPress={() => handlePress(product.product_id)}
//             activeOpacity={0.8}
//             style={styles.card}
//           >
//             {product.thumbnail && (
//               <Image
//                 source={{ uri: product.thumbnail }}
//                 style={styles.thumbnail}
//                 resizeMode="cover"
//               />
//             )}

//             {product.tag && (
//               <View style={styles.tagContainer}>
//                 <Text style={styles.tagText}>{product.tag}</Text>
//               </View>
//             )}

//             <Text style={styles.title} numberOfLines={2}>
//               {product.title}
//             </Text>

//             <View style={styles.priceRow}>
//               <Text style={styles.priceText}>{product.price}</Text>
//               {product.old_price && (
//                 <Text style={styles.oldPriceText}>{product.old_price}</Text>
//               )}
//             </View>

//             {(product.rating || product.reviews) && (
//               <View style={styles.ratingRow}>
//                 {product.rating != null && (
//                   <Text style={styles.ratingText}>{`★ ${product.rating.toFixed(1)}`}</Text>
//                 )}
//                 {product.reviews && (
//                   <Text style={styles.reviewsText}>
//                     {`${product.reviews.toLocaleString()} reviews`}
//                   </Text>
//                 )}
//               </View>
//             )}

//             {product.source && (
//               <Text style={styles.sourceText}>
//                 Sold by: {product.source}
//               </Text>
//             )}

//             {product.snippet && (
//               <Text style={styles.snippetText} numberOfLines={1}>
//                 {product.snippet}
//               </Text>
//             )}
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// // Basic styling
// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//   },
//   scrollContent: {
//     paddingHorizontal: 8,
//     paddingVertical: 16,
//     flexDirection: 'row',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     width: 240,
//     padding: 12,
//     marginRight: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//     position: 'relative',
//   },
//   thumbnail: {
//     width: '100%',
//     height: 160,
//     borderRadius: 8,
//   },
//   tagContainer: {
//     position: 'absolute',
//     top: 8,
//     left: 8,
//     backgroundColor: '#dc2626',
//     borderRadius: 4,
//     paddingHorizontal: 4,
//   },
//   tagText: {
//     color: '#fff',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   title: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginTop: 8,
//     color: '#111',
//   },
//   priceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 4,
//   },
//   priceText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#000',
//   },
//   oldPriceText: {
//     fontSize: 12,
//     color: '#6b7280',
//     textDecorationLine: 'line-through',
//     marginLeft: 8,
//   },
//   ratingRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 4,
//   },
//   ratingText: {
//     color: '#facc15',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   reviewsText: {
//     fontSize: 10,
//     color: '#4b5563',
//     marginLeft: 8,
//   },
//   sourceText: {
//     fontSize: 10,
//     color: '#6b7280',
//     marginTop: 4,
//   },
//   snippetText: {
//     fontSize: 10,
//     color: '#111',
//     marginTop: 4,
//   },
// });


// components/HorizontalProducts.tsx

import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface Product {
  product_id: string;
  title: string;
  price: string;
  old_price?: string;
  rating?: number;
  reviews?: number;
  snippet?: string;
  source?: string;
  thumbnail?: string;
  tag?: string;
}

type HorizontalProductsProps = {
  products: Product[];
  onProductPress?: (productId: string, allProducts: Product[]) => void;
};

// export default function HorizontalProducts({ products, onProductPress }: HorizontalProductsProps) {
  export default function HorizontalProducts({
    products = [],
    onProductPress
  }: HorizontalProductsProps) {


  const handlePress = (productId: string) => {
    if (onProductPress) {
      onProductPress(productId, products);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {products.map((product) => (
          <TouchableOpacity
            key={product.product_id}
            onPress={() => handlePress(product.product_id)}
            activeOpacity={0.8}
            style={styles.card}
          >
            {product.thumbnail && (
              <Image
                source={{ uri: product.thumbnail }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            )}

            {product.tag && (
              <View style={styles.tagContainer}>
                <Text style={styles.tagText}>{product.tag}</Text>
              </View>
            )}

            <Text style={styles.title} numberOfLines={2}>
              {product.title}
            </Text>

            <View style={styles.priceRow}>
              <Text style={styles.priceText}>{product.price}</Text>
              {product.old_price && (
                <Text style={styles.oldPriceText}>{product.old_price}</Text>
              )}
            </View>

            {(product.rating || product.reviews) && (
              <View style={styles.ratingRow}>
                {product.rating != null && (
                  <Text style={styles.ratingText}>★ {product.rating.toFixed(1)}</Text>
                )}
                {product.reviews && (
                  <Text style={styles.reviewsText}>
                    {product.reviews.toLocaleString()} reviews
                  </Text>
                )}
              </View>
            )}

            {product.source && (
              <Text style={styles.sourceText}>
                Sold by: {product.source}
              </Text>
            )}

            {product.snippet && (
              <Text style={styles.snippetText} numberOfLines={1}>
                {product.snippet}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  scrollContent: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 240,
    padding: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  tagContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#dc2626',
    borderRadius: 4,
    paddingHorizontal: 4,
  },
  tagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    color: '#111',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  oldPriceText: {
    fontSize: 12,
    color: '#6b7280',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    color: '#facc15',
    fontWeight: '600',
    fontSize: 14,
  },
  reviewsText: {
    fontSize: 10,
    color: '#4b5563',
    marginLeft: 8,
  },
  sourceText: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
  },
  snippetText: {
    fontSize: 10,
    color: '#111',
    marginTop: 4,
  },
});