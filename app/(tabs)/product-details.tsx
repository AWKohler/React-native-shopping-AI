// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   ActivityIndicator,
//   StyleSheet,
//   Linking,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   Dimensions,
//   Platform,
// } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import { LinearGradient } from 'expo-linear-gradient';

// const { width } = Dimensions.get('window');
// const SPACING = 20;

// interface Seller {
//   position: number;
//   name: string;
//   link: string;
//   base_price: string;
//   total_price?: string;
// }

// const getFaviconUrl = (url: string) => {
//     try {
//       const domain = new URL(url).origin;
//       return `${domain}/favicon.ico`;
//     } catch {
//       return null;
//     }
// };

// export default function ProductDetailsScreen() {
//   const { productId } = useLocalSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [details, setDetails] = useState<any>(null);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   useEffect(() => {
//     if (productId) {
//       fetchDetails(productId as string);
//     }
//   }, [productId]);

//   const fetchDetails = async (id: string) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await fetch('http://localhost:8081/api/productDetails', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ product_id: id }),
//       });

//       if (!response.ok) throw new Error(`Error: ${response.status}`);
//       const data = await response.json();
//       setDetails(data);
//     } catch (err: any) {
//       setError(err.message ?? 'Failed to fetch product details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSellerPress = (link: string) => {
//     if (link) Linking.openURL(link);
//   };

//   if (!productId) {
//     return <EmptyState message="No productId provided." />;
//   }

//   if (loading) {
//     return <LoadingState />;
//   }

//   if (error) {
//     return <EmptyState message={error} isError />;
//   }

//   if (!details) {
//     return <EmptyState message="No details found for this product." />;
//   }

//   const productInfo = details?.product_results || {};
//   const sellers = details?.sellers_results?.online_sellers || [];
//   const { title, rating, reviews, prices, description, media, highlights = [] } = productInfo;


//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Image Gallery */}
//         <View style={styles.imageContainer}>
//           <ScrollView
//             horizontal
//             pagingEnabled
//             showsHorizontalScrollIndicator={false}
//             onScroll={({ nativeEvent }) => {
//               const slide = Math.ceil(
//                 nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
//               );
//               if (slide !== activeImageIndex) setActiveImageIndex(slide);
//             }}
//           >
//             {Array.isArray(media) &&
//               media
//                 .filter((m: any) => m.type === 'image')
//                 .map((img: any, idx: number) => (
//                   <Image
//                     key={idx}
//                     source={{ uri: img.link }}
//                     style={styles.productImage}
//                     resizeMode="contain"
//                   />
//                 ))}
//           </ScrollView>
//           {/* Pagination Dots */}
//           {Array.isArray(media) && media.length > 1 && (
//             <View style={styles.pagination}>
//               {media
//                 .filter((m: any) => m.type === 'image')
//                 .map((_, idx) => (
//                   <View
//                     key={idx}
//                     style={[
//                       styles.paginationDot,
//                       idx === activeImageIndex && styles.paginationDotActive,
//                     ]}
//                   />
//                 ))}
//             </View>
//           )}
//         </View>

//         <View style={styles.contentContainer}>
//           {/* Title and Rating */}
//           <View style={styles.headerContainer}>
//             <Text style={styles.title}>{title}</Text>
//             <View style={styles.ratingContainer}>
//               <Text style={styles.rating}>★ {rating?.toFixed(1)}</Text>
//               <Text style={styles.reviews}>
//                 {reviews?.toLocaleString()} reviews
//               </Text>
//             </View>
//           </View>

//           {/* Price Range */}
//           {Array.isArray(prices) && prices.length > 0 && (
//             <View style={styles.priceContainer}>
//               <Text style={styles.priceLabel}>Price Range</Text>
//               <Text style={styles.priceRange}>
//                 {`${Math.min(...prices.map(p => parseFloat(p.replace(/[^0-9.-]+/g, ''))))} - ${
//                   Math.max(...prices.map(p => parseFloat(p.replace(/[^0-9.-]+/g, ''))))
//                 }`}
//               </Text>
//             </View>
//           )}

//           {/* Highlights */}
//           {highlights.length > 0 && (
//             <View style={styles.highlightsContainer}>
//               <Text style={styles.sectionTitle}>Highlights</Text>
//               {highlights.map((highlight: string, idx: number) => (
//                 <View key={idx} style={styles.highlightItem}>
//                   <Text style={styles.bulletPoint}>•</Text>
//                   <Text style={styles.highlightText}>{highlight}</Text>
//                 </View>
//               ))}
//             </View>
//           )}

//           {/* Description */}
//           {description && (
//             <View style={styles.descriptionContainer}>
//               <Text style={styles.sectionTitle}>About this item</Text>
//               <Text style={styles.description}>{description}</Text>
//             </View>
//           )}

//           {/* Sellers */}
//           {/* <View style={styles.sellersContainer}>
//             <Text style={styles.sectionTitle}>Where to Buy</Text>
//             {sellers.map((seller: Seller, index: number) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.sellerCard}
//                 onPress={() => handleSellerPress(seller.link)}
//               >
//                 <View style={styles.sellerInfo}>
//                   <Text style={styles.sellerName}>{seller.name}</Text>
//                   <Text style={styles.sellerTotal}>
//                     {seller.total_price || seller.base_price}
//                   </Text>
//                 </View>
//                 <LinearGradient
//                   colors={['#007AFF', '#0055FF']}
//                   style={styles.buyButton}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                 >
//                   <Text style={styles.buyButtonText}>Buy Now</Text>
//                 </LinearGradient>
//               </TouchableOpacity>
//             ))}
//           </View> */}


//           <View style={styles.sellersContainer}>
//           <Text style={styles.sectionTitle}>Where to Buy</Text>
//           {sellers.map((seller: Seller, index: number) => {
//             const faviconUrl = getFaviconUrl(seller.direct_link || seller.link);
            
//             return (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.sellerCard}
//                 onPress={() => handleSellerPress(seller.link)}
//               >
//                 <View style={styles.sellerInfo}>
//                   <View style={styles.sellerNameContainer}>
//                     {faviconUrl && (
//                       <Image
//                         source={{ uri: faviconUrl }}
//                         style={styles.favicon}
//                         defaultSource={require('./assets/default-favicon.png')} // You'll need to add a default favicon
//                       />
//                     )}
//                     <Text style={styles.sellerName}>{seller.name}</Text>
//                   </View>
//                   <Text style={styles.sellerTotal}>
//                     {seller.total_price || seller.base_price}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             );
//           })}
//         </View>


//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const LoadingState = () => (
//   <View style={styles.centerContainer}>
//     <ActivityIndicator size="large" color="#007AFF" />
//     <Text style={styles.loadingText}>Loading details...</Text>
//   </View>
// );

// const EmptyState = ({ message, isError }: { message: string; isError?: boolean }) => (
//   <View style={styles.centerContainer}>
//     <Text style={[styles.emptyStateText, isError && styles.errorText]}>{message}</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   imageContainer: {
//     height: width * 0.8,
//     backgroundColor: '#F8F9FA',
//   },
//   productImage: {
//     width: width,
//     height: width * 0.8,
//   },
//   pagination: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 20,
//     alignSelf: 'center',
//   },
//   paginationDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#DDD',
//     marginHorizontal: 4,
//   },
//   paginationDotActive: {
//     backgroundColor: '#007AFF',
//   },
//   contentContainer: {
//     padding: SPACING,
//   },
//   headerContainer: {
//     marginBottom: SPACING,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#1A1A1A',
//     marginBottom: 8,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   rating: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFB800',
//     marginRight: 8,
//   },
//   reviews: {
//     fontSize: 14,
//     color: '#666',
//   },
//   priceContainer: {
//     backgroundColor: '#F8F9FA',
//     padding: SPACING,
//     borderRadius: 12,
//     marginBottom: SPACING,
//   },
//   priceLabel: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 4,
//   },
//   priceRange: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#1A1A1A',
//   },
//   highlightsContainer: {
//     marginBottom: SPACING,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#1A1A1A',
//     marginBottom: 12,
//   },
//   highlightItem: {
//     flexDirection: 'row',
//     marginBottom: 8,
//   },
//   bulletPoint: {
//     fontSize: 16,
//     color: '#007AFF',
//     marginRight: 8,
//   },
//   highlightText: {
//     fontSize: 15,
//     color: '#4A4A4A',
//     flex: 1,
//   },
//   descriptionContainer: {
//     marginBottom: SPACING,
//   },
//   description: {
//     fontSize: 15,
//     lineHeight: 24,
//     color: '#4A4A4A',
//   },
//   sellersContainer: {
//     marginBottom: SPACING,
//   },
//   sellerCard: {
//     backgroundColor: '#F8F9FA',
//     borderRadius: 12,
//     padding: SPACING,
//     marginBottom: 12,
//   },
//   sellerInfo: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     // marginBottom: 12,
//   },
//   sellerName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#1A1A1A',
//   },
//   sellerTotal: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#007AFF',
//   },
//   sellerNameContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   favicon: {
//     width: 20,
//     height: 20,
//     marginRight: 8,
//     borderRadius: 4,
//   },
//   buyButton: {
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buyButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 12,
//     fontSize: 16,
//     color: '#666',
//   },
//   emptyStateText: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//     padding: SPACING,
//   },
//   errorText: {
//     color: '#FF3B30',
//   },
// });

// import React, { useRef, useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   SafeAreaView,
//   Image,
//   ScrollView,
// } from 'react-native';
// import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   useAnimatedGestureHandler,
//   withSpring,
// } from 'react-native-reanimated';
// import { useLocalSearchParams } from 'expo-router';

// /**
//  * Dummy data for "adjacent" cards. We'll show just 4 dummy placeholders
//  * for top, bottom, left, and right. The central card is our real product.
//  */
// const DUMMY_CARDS = [
//   { id: 'top', label: 'Dummy Top Card' },
//   { id: 'bottom', label: 'Dummy Bottom Card' },
//   { id: 'left', label: 'Dummy Left Card' },
//   { id: 'right', label: 'Dummy Right Card' },
// ];

// /**
//  * The dimension for each card can be
//  * smaller than full screen to allow the edges
//  * of adjacent cards to peek in.
//  */
// const { width, height } = Dimensions.get('window');
// const CARD_WIDTH = width * 0.85;
// const CARD_HEIGHT = height * 0.7;

// /**
//  * Some “snap” offsets so that each card centers itself
//  * when user swipes. We'll place them in a 3x3 grid, with the
//  * center cell for the actual product. The dummy cells around it
//  * are top, bottom, left, right placeholders.
//  *
//  * We'll do a coordinate system where (0, 0) is the center card.
//  * So top = (0, -1), right = (1, 0), etc. This means the translation
//  * from the center will be ±(CARD_WIDTH + some spacing) horizontally
//  * and ±(CARD_HEIGHT + spacing) vertically.
//  */
// const SPACING = 20; // spacing between cards
// function getCardOffsetX(col: number) {
//   return col * (CARD_WIDTH + SPACING);
// }
// function getCardOffsetY(row: number) {
//   return row * (CARD_HEIGHT + SPACING);
// }

// /**
//  * For “read more” or scrollable text, we’ll have a small ScrollView
//  * inside the card. If you prefer a "Read more" link that expands, you
//  * can do that instead.  
//  */

// export default function ProductCardGridView() {
//   const { productId } = useLocalSearchParams();
//   const [productData, setProductData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   /**
//    * You can fetch real product data from your existing /api/productDetails
//    * as before. For demonstration, we do a simple fetch if productId is present.
//    */
//   useEffect(() => {
//     if (!productId) {
//       setLoading(false);
//       return;
//     }
//     (async () => {
//       try {
//         setLoading(true);
//         const res = await fetch('http://localhost:8081/api/productDetails', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ product_id: productId }),
//         });
//         const data = await res.json();
//         setProductData(data);
//       } catch (err) {
//         console.warn('Error fetching product details:', err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [productId]);

//   // The center card’s product info
//   const productInfo = productData?.product_results ?? null;
//   const { title, rating, reviews, description, media } = productInfo || {};

//   // Reanimated shared values for X, Y offsets
//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);

//   // Set up the gesture handler to drag the card around
//   // and snap to each cell of the grid.
//   const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { x: number; y: number }>({
//     onStart: (evt, ctx) => {
//       ctx.x = translateX.value;
//       ctx.y = translateY.value;
//     },
//     onActive: (evt, ctx) => {
//       translateX.value = ctx.x + evt.translationX;
//       translateY.value = ctx.y + evt.translationY;
//     },
//     onEnd: () => {
//       // On release, we figure out which "cell" is closest
//       // and snap to that cell. 
//       // Each cell can be (col, row) in [-1, 0, 1].
//       const snapCol = Math.round(translateX.value / (CARD_WIDTH + SPACING));
//       const snapRow = Math.round(translateY.value / (CARD_HEIGHT + SPACING));

//       // We only have [top, bottom, left, right, center].
//       // So clamp row, col to [-1, 1].
//       const clampedCol = Math.max(-1, Math.min(1, snapCol));
//       const clampedRow = Math.max(-1, Math.min(1, snapRow));

//       // Animate with spring
//       translateX.value = withSpring(getCardOffsetX(clampedCol));
//       translateY.value = withSpring(getCardOffsetY(clampedRow));
//     },
//   });

//   // The animated style to position the card group container
//   // so that the center card is at offset (0,0)
//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { translateX: -translateX.value },
//         { translateY: -translateY.value },
//       ],
//     };
//   });

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.centered}>
//         <Text>Loading product details...</Text>
//       </SafeAreaView>
//     );
//   }

//   if (!productId) {
//     // If no productId, just show "no product selected"
//     return (
//       <SafeAreaView style={styles.centered}>
//         <Text>No product selected</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <PanGestureHandler onGestureEvent={gestureHandler}>
//         <Animated.View style={[styles.gridContainer, animatedStyle]}>
//           {/*
//             1) The "dummy" top card at row=-1, col=0
//           */}
//           <CardPlaceholder
//             label="Top"
//             offsetX={getCardOffsetX(0)}
//             offsetY={getCardOffsetY(-1)}
//           />

//           {/*
//             2) The "dummy" left card at row=0, col=-1
//           */}
//           <CardPlaceholder
//             label="Left"
//             offsetX={getCardOffsetX(-1)}
//             offsetY={getCardOffsetY(0)}
//           />

//           {/*
//             3) Our actual product card at row=0, col=0
//           */}
//           <ProductCard
//             productInfo={productInfo}
//             offsetX={getCardOffsetX(0)}
//             offsetY={getCardOffsetY(0)}
//           />

//           {/*
//             4) The "dummy" right card at row=0, col=1
//           */}
//           <CardPlaceholder
//             label="Right"
//             offsetX={getCardOffsetX(1)}
//             offsetY={getCardOffsetY(0)}
//           />

//           {/*
//             5) The "dummy" bottom card at row=1, col=0
//           */}
//           <CardPlaceholder
//             label="Bottom"
//             offsetX={getCardOffsetX(0)}
//             offsetY={getCardOffsetY(1)}
//           />
//         </Animated.View>
//       </PanGestureHandler>
//     </SafeAreaView>
//   );
// }

// /** The main product card that displays the item info. */
// function ProductCard({
//   productInfo,
//   offsetX,
//   offsetY,
// }: {
//   productInfo: any;
//   offsetX: number;
//   offsetY: number;
// }) {
//   const { title, rating, reviews, description, media } = productInfo || {};
//   return (
//     <Animated.View
//       style={[
//         styles.card,
//         {
//           // Position absolutely in the grid
//           left: offsetX,
//           top: offsetY,
//         },
//       ]}
//     >
//       {/* If we have images, show the first one. */}
//       {Array.isArray(media) && media.length > 0 ? (
//         <Image
//           source={{ uri: media[0].link }}
//           style={styles.productImage}
//           resizeMode="contain"
//         />
//       ) : (
//         <View style={[styles.productImage, { backgroundColor: '#eee' }]}>
//           <Text>No image</Text>
//         </View>
//       )}
//       <View style={styles.infoContainer}>
//         <Text style={styles.title} numberOfLines={2}>
//           {title}
//         </Text>
//         {rating != null && (
//           <Text style={styles.rating}>{`★ ${rating.toFixed(1)} (${reviews} reviews)`}</Text>
//         )}

//         {/** A small scrollable area for product description */}
//         <ScrollView style={styles.descScroll}>
//           <Text style={styles.description}>{description}</Text>
//         </ScrollView>
//       </View>
//     </Animated.View>
//   );
// }

// /** A placeholder card for the dummy cells. */
// function CardPlaceholder({
//   label,
//   offsetX,
//   offsetY,
// }: {
//   label: string;
//   offsetX: number;
//   offsetY: number;
// }) {
//   return (
//     <Animated.View
//       style={[
//         styles.card,
//         {
//           backgroundColor: '#eee',
//           left: offsetX,
//           top: offsetY,
//         },
//       ]}
//     >
//       <Text style={{ fontSize: 16 }}>{label} (dummy card)</Text>
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fafafa',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   gridContainer: {
//     // We position each card absolutely, so this container is “infinite”.
//     // The PanGestureHandler will move it around to reveal each card.
//     width: 2000,
//     height: 2000,
//   },
//   card: {
//     position: 'absolute',
//     width: CARD_WIDTH,
//     height: CARD_HEIGHT,
//     borderRadius: 16,
//     backgroundColor: '#fff',
//     padding: 16,
//     // Basic shadow/elevation
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   productImage: {
//     width: '100%',
//     height: '50%',
//     borderRadius: 8,
//     marginBottom: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   infoContainer: {
//     flex: 1,
//   },
//   title: {
//     fontWeight: '600',
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   rating: {
//     fontSize: 14,
//     marginBottom: 8,
//     color: '#555',
//   },
//   descScroll: {
//     flex: 1,
//     marginTop: 8,
//     borderWidth: 1,
//     borderColor: '#eee',
//     borderRadius: 8,
//     padding: 8,
//   },
//   description: {
//     fontSize: 14,
//     color: '#333',
//   },
// });


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   SafeAreaView,
//   Image,
//   ScrollView,
// } from 'react-native';
// import {
//   PanGestureHandler,
//   PanGestureHandlerGestureEvent,
// } from 'react-native-gesture-handler';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   useAnimatedGestureHandler,
//   withSpring,
// } from 'react-native-reanimated';
// import { useLocalSearchParams } from 'expo-router';

// /**
//  * We’ll show the real product info in the center card,
//  * and four dummy placeholders around it (above, below, left, right).
//  */
// const DUMMY_CARDS = ['Top', 'Bottom', 'Left', 'Right'];

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// /**
//  * We shrink the card so it’s notably smaller than the screen,
//  * guaranteeing that the adjacent cards peek in from each side.
//  * Adjust these until the UI matches your preference.
//  */
// const CARD_WIDTH = SCREEN_WIDTH * 0.6;
// const CARD_HEIGHT = SCREEN_HEIGHT * 0.45;

// /**
//  * Spacing between each card in the grid.
//  * If you want them to overlap more or less, adjust SPACING up/down.
//  */
// const SPACING = 40;

// /** Utility to compute the X offset for a “column” (-1,0,1) in our grid */
// function getOffsetX(col: number) {
//   return col * (CARD_WIDTH + SPACING);
// }

// /** Utility to compute the Y offset for a “row” (-1,0,1) in our grid */
// function getOffsetY(row: number) {
//   return row * (CARD_HEIGHT + SPACING);
// }

// export default function ProductDetailsCardView() {
//   const { productId } = useLocalSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [productData, setProductData] = useState<any>(null);

//   useEffect(() => {
//     if (!productId) {
//       setLoading(false);
//       return;
//     }

//     (async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Example fetch call for product details:
//         const response = await fetch('http://localhost:8081/api/productDetails', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ product_id: productId }),
//         });

//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }

//         const data = await response.json();
//         setProductData(data);
//       } catch (err: any) {
//         setError(err.message ?? 'Failed to fetch product details');
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [productId]);

//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);

//   /**
//    * We’ll center the “grid” so the middle card is in the middle of the screen.
//    * That means we’ll do a negative offset so that (row=0, col=0) is near the screen center.
//    * By default, we place the center card at (0,0). The user can then swipe
//    * around to the other positions.
//    */
//   const gestureHandler = useAnimatedGestureHandler<
//     PanGestureHandlerGestureEvent,
//     { startX: number; startY: number }
//   >({
//     onStart: (_, ctx) => {
//       ctx.startX = translateX.value;
//       ctx.startY = translateY.value;
//     },
//     onActive: (event, ctx) => {
//       translateX.value = ctx.startX + event.translationX;
//       translateY.value = ctx.startY + event.translationY;
//     },
//     onEnd: () => {
//       // Snap to whichever “cell” is closest.
//       const col = Math.round(translateX.value / (CARD_WIDTH + SPACING));
//       const row = Math.round(translateY.value / (CARD_HEIGHT + SPACING));
//       // Limit to [-1, 1] in both directions.
//       const snapCol = Math.max(-1, Math.min(1, col));
//       const snapRow = Math.max(-1, Math.min(1, row));

//       // Animate back into place.
//       translateX.value = withSpring(snapCol * (CARD_WIDTH + SPACING));
//       translateY.value = withSpring(snapRow * (CARD_HEIGHT + SPACING));
//     },
//   });

//   const animatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { translateX: -translateX.value },
//         { translateY: -translateY.value },
//       ],
//     };
//   });

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.center}>
//         <Text>Loading details...</Text>
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={styles.center}>
//         <Text style={{ color: 'red' }}>{error}</Text>
//       </SafeAreaView>
//     );
//   }

//   if (!productId) {
//     return (
//       <SafeAreaView style={styles.center}>
//         <Text>No product selected.</Text>
//       </SafeAreaView>
//     );
//   }

//   // Parse data
//   const productInfo = productData?.product_results ?? {};
//   const { title, rating, reviews, description, media } = productInfo;

//   return (
//     <SafeAreaView style={styles.mainContainer}>
//       {/* Fullscreen container with a PanGesture. */}
//       <PanGestureHandler onGestureEvent={gestureHandler}>
//         <Animated.View style={[styles.gridContainer, animatedStyle]}>
//           {/* Dummy top card */}
//           <CardPlaceholder
//             label="Top card"
//             offsetX={getOffsetX(0)}
//             offsetY={getOffsetY(-1)}
//           />
//           {/* Dummy left card */}
//           <CardPlaceholder
//             label="Left card"
//             offsetX={getOffsetX(-1)}
//             offsetY={getOffsetY(0)}
//           />
//           {/* Actual product card (center) */}
//           <ProductCard
//             info={{ title, rating, reviews, description, media }}
//             offsetX={getOffsetX(0)}
//             offsetY={getOffsetY(0)}
//           />
//           {/* Dummy right card */}
//           <CardPlaceholder
//             label="Right card"
//             offsetX={getOffsetX(1)}
//             offsetY={getOffsetY(0)}
//           />
//           {/* Dummy bottom card */}
//           <CardPlaceholder
//             label="Bottom card"
//             offsetX={getOffsetX(0)}
//             offsetY={getOffsetY(1)}
//           />
//         </Animated.View>
//       </PanGestureHandler>
//     </SafeAreaView>
//   );
// }

// /** The central product card with condensed info. */
// function ProductCard({
//   info,
//   offsetX,
//   offsetY,
// }: {
//   info: any;
//   offsetX: number;
//   offsetY: number;
// }) {
//   const { title, rating, reviews, description, media } = info || {};

//   return (
//     <Animated.View
//       style={[
//         styles.card,
//         {
//           left: offsetX,
//           top: offsetY,
//           backgroundColor: '#fff',
//         },
//       ]}
//     >
//       {Array.isArray(media) && media.length > 0 ? (
//         <Image
//           source={{ uri: media[0].link }}
//           style={styles.cardImage}
//           resizeMode="cover"
//         />
//       ) : (
//         <View style={[styles.cardImage, { justifyContent: 'center' }]}>
//           <Text>No image</Text>
//         </View>
//       )}
//       <View style={styles.cardContent}>
//         <Text style={styles.title} numberOfLines={2}>
//           {title}
//         </Text>
//         {rating != null && (
//           <Text style={styles.rating}>
//             {`★ ${rating.toFixed(1)} (${reviews} reviews)`}
//           </Text>
//         )}

//         {/* Condensed scroll area for the description */}
//         <ScrollView style={styles.descriptionBox}>
//           <Text style={styles.descriptionText}>{description}</Text>
//         </ScrollView>
//       </View>
//     </Animated.View>
//   );
// }

// /** Simple placeholder for top/left/right/bottom dummy cards. */
// function CardPlaceholder({
//   label,
//   offsetX,
//   offsetY,
// }: {
//   label: string;
//   offsetX: number;
//   offsetY: number;
// }) {
//   return (
//     <Animated.View
//       style={[
//         styles.card,
//         {
//           left: offsetX,
//           top: offsetY,
//           backgroundColor: '#eee',
//           alignItems: 'center',
//           justifyContent: 'center',
//         },
//       ]}
//     >
//       <Text style={{ fontWeight: '600', color: '#555' }}>{label}</Text>
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//   },
//   center: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   gridContainer: {
//     // Make it extra large so we can position cards in a “3x3” around the center
//     width: SCREEN_WIDTH * 3,
//     height: SCREEN_HEIGHT * 3,
//   },
//   card: {
//     position: 'absolute',
//     width: CARD_WIDTH,
//     height: CARD_HEIGHT,
//     borderRadius: 12,
//     overflow: 'hidden',
//     // Basic shadow/elevation:
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   cardImage: {
//     width: '100%',
//     height: '55%',
//     backgroundColor: '#ddd',
//   },
//   cardContent: {
//     flex: 1,
//     padding: 10,
//   },
//   title: {
//     fontSize: 15,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   rating: {
//     fontSize: 13,
//     color: '#444',
//     marginBottom: 6,
//   },
//   descriptionBox: {
//     flex: 1,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 6,
//     padding: 8,
//   },
//   descriptionText: {
//     fontSize: 12,
//     color: '#333',
//   },
// });


// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   SafeAreaView,
//   View,
//   Text,
//   Dimensions,
//   Image,
//   ScrollView,
// } from 'react-native';

// // 1) Make sure you have react-native-gesture-handler installed
// import {
//   PanGestureHandler,
//   PanGestureHandlerGestureEvent,
//   GestureHandlerRootView,
// } from 'react-native-gesture-handler';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   useAnimatedGestureHandler,
//   withSpring,
// } from 'react-native-reanimated';

// // If you’re using Expo Router, you can import productId from your route:
// import { useLocalSearchParams } from 'expo-router';

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// /**
//  * Scale the card to a fraction of the screen.
//  * Adjust these to taste. For example:
//  *   CARD_WIDTH = 80% of screen
//  *   CARD_HEIGHT = 60% of screen
//  */
// const CARD_WIDTH = SCREEN_WIDTH * 0.8;
// const CARD_HEIGHT = SCREEN_HEIGHT * 0.6;

// /**
//  * A small gap for the “peeking corners” to be behind the card.
//  * We’ll also position them absolutely so they appear
//  * around the edges of the main card.
//  */
// const CARD_BORDER_RADIUS = 20; // how rounded the main card corners are

// export default function ProductDetailsScreen() {
//   const { productId } = useLocalSearchParams(); // or some route param
//   const [productData, setProductData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // 2) Implement a simple gesture so the card can be dragged but snaps back.
//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);

//   useEffect(() => {
//     if (!productId) {
//       setLoading(false);
//       return;
//     }
//     (async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Example fetch:
//         const response = await fetch('http://localhost:8081/api/productDetails', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ product_id: productId }),
//         });
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }
//         const data = await response.json();
//         setProductData(data);
//       } catch (err: any) {
//         setError(err.message ?? 'Failed to fetch product details');
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [productId]);

//   // Basic states:
//   if (loading) {
//     return (
//       <SafeAreaView style={styles.centered}>
//         <Text>Loading product details...</Text>
//       </SafeAreaView>
//     );
//   }
//   if (error) {
//     return (
//       <SafeAreaView style={styles.centered}>
//         <Text style={{ color: 'red' }}>{error}</Text>
//       </SafeAreaView>
//     );
//   }
//   if (!productId) {
//     return (
//       <SafeAreaView style={styles.centered}>
//         <Text>No product selected.</Text>
//       </SafeAreaView>
//     );
//   }

//   // If you have product details from your fetch:
//   const productInfo = productData?.product_results ?? {};
//   const { title, rating, reviews, description, media } = productInfo;

//   // 2) Implement a simple gesture so the card can be dragged but snaps back.
//   // const translateX = useSharedValue(0);
//   // const translateY = useSharedValue(0);

//   const gestureHandler = useAnimatedGestureHandler<
//     PanGestureHandlerGestureEvent,
//     { startX: number; startY: number }
//   >({
//     onStart: (_, ctx) => {
//       ctx.startX = translateX.value;
//       ctx.startY = translateY.value;
//     },
//     onActive: (evt, ctx) => {
//       translateX.value = ctx.startX + evt.translationX;
//       translateY.value = ctx.startY + evt.translationY;
//     },
//     onEnd: () => {
//       // Snap card back to center
//       translateX.value = withSpring(0);
//       translateY.value = withSpring(0);
//     },
//   });

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       { translateX: translateX.value },
//       { translateY: translateY.value },
//     ],
//   }));

//   return (
//     /**
//      * 3) Because we use PanGestureHandler,
//      *    wrap the top level in GestureHandlerRootView
//      *    (You can do this in app/_layout.tsx instead).
//      */
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <SafeAreaView style={styles.container}>

//         {/* "Peeking corners" are drawn behind the card to simulate next cards. */}
//         <View style={styles.peekingContainer}>
//           {/* TOP peek rectangle */}
//           <View style={[styles.peekRect, styles.peekTop]} />
//           {/* BOTTOM peek rectangle */}
//           <View style={[styles.peekRect, styles.peekBottom]} />
//           {/* LEFT peek rectangle */}
//           <View style={[styles.peekRect, styles.peekLeft]} />
//           {/* RIGHT peek rectangle */}
//           <View style={[styles.peekRect, styles.peekRight]} />
//         </View>

//         {/* The actual focus card in the center */}
//         <PanGestureHandler onGestureEvent={gestureHandler}>
//           <Animated.View style={[styles.card, animatedStyle]}>
//             {/* Example: top half for an image */}
//             {Array.isArray(media) && media.length > 0 ? (
//               <Image
//                 source={{ uri: media[0].link }}
//                 style={styles.cardImage}
//                 resizeMode="cover"
//               />
//             ) : (
//               <View style={[styles.cardImage, { justifyContent: 'center' }]}>
//                 <Text>No image</Text>
//               </View>
//             )}

//             {/* Bottom half for text */}
//             <View style={styles.cardContent}>
//               <Text style={styles.title} numberOfLines={2}>{title}</Text>
//               {rating != null && (
//                 <Text style={styles.rating}>
//                   {`★ ${rating.toFixed(1)} (${reviews} reviews)`}
//                 </Text>
//               )}

//               <ScrollView style={styles.descScroll}>
//                 <Text style={styles.descText}>{description}</Text>
//               </ScrollView>
//             </View>
//           </Animated.View>
//         </PanGestureHandler>
//       </SafeAreaView>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F2F2F2',
//     // Align items so that the card is in the center by default
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   centered: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   /**
//    * 4) The four “peeking corners”:
//    * Each is a rectangle that sits behind the main card in the center,
//    * with two corners rounded to match the edges of the center card.
//    */
//   peekingContainer: {
//     ...StyleSheet.absoluteFillObject,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   peekRect: {
//     position: 'absolute',
//     width: CARD_WIDTH,
//     height: CARD_HEIGHT * 0.25, // or some fraction so it’s obviously small
//     backgroundColor: '#E0E0E0',
//   },
//   // Top: Place it so the bottom corners align w/ the top corners of the main card
//   peekTop: {
//     bottom: CARD_HEIGHT / 2 + 2, // shift it above the center
//     borderBottomLeftRadius: CARD_BORDER_RADIUS,
//     borderBottomRightRadius: CARD_BORDER_RADIUS,
//   },
//   // Bottom: Place it so the top corners align w/ the bottom corners of the main card
//   peekBottom: {
//     top: CARD_HEIGHT / 2 + 2, // shift it below the center
//     borderTopLeftRadius: CARD_BORDER_RADIUS,
//     borderTopRightRadius: CARD_BORDER_RADIUS,
//   },
//   // Left: a vertical rectangle that lines up w/ left edge of the main card
//   peekLeft: {
//     right: CARD_WIDTH / 2 + 2,
//     width: CARD_WIDTH * 0.25,
//     height: CARD_HEIGHT,
//     borderTopRightRadius: CARD_BORDER_RADIUS,
//     borderBottomRightRadius: CARD_BORDER_RADIUS,
//   },
//   // Right: a vertical rectangle that lines up w/ right edge of the main card
//   peekRight: {
//     left: CARD_WIDTH / 2 + 2,
//     width: CARD_WIDTH * 0.25,
//     height: CARD_HEIGHT,
//     borderTopLeftRadius: CARD_BORDER_RADIUS,
//     borderBottomLeftRadius: CARD_BORDER_RADIUS,
//   },

//   /**
//    * 5) The actual center card
//    */
//   card: {
//     width: CARD_WIDTH,
//     height: CARD_HEIGHT,
//     borderRadius: CARD_BORDER_RADIUS,
//     backgroundColor: '#FFFFFF',
//     // Basic shadow or elevation:
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     shadowRadius: 5,
//     elevation: 3,
//     overflow: 'hidden',
//   },
//   cardImage: {
//     width: '100%',
//     height: '50%',
//     backgroundColor: '#DDD',
//   },
//   cardContent: {
//     flex: 1,
//     padding: 12,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 6,
//   },
//   rating: {
//     fontSize: 13,
//     color: '#444',
//     marginBottom: 10,
//   },
//   descScroll: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#CCC',
//     borderRadius: 8,
//     padding: 8,
//   },
//   descText: {
//     fontSize: 13,
//     color: '#333',
//     lineHeight: 18,
//   },
// });




// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   SafeAreaView,
//   Image,
//   ScrollView,
// } from 'react-native';
// import {
//   PanGestureHandler,
//   PanGestureHandlerGestureEvent,
// } from 'react-native-gesture-handler';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   useAnimatedGestureHandler,
//   withSpring,
// } from 'react-native-reanimated';
// import { useLocalSearchParams } from 'expo-router';

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// // Card takes up most of the screen but leaves room for peeks
// const CARD_WIDTH = SCREEN_WIDTH * 0.85;
// const CARD_HEIGHT = SCREEN_HEIGHT * 0.75;

// // How much of adjacent "cards" should peek in
// const PEEK_AMOUNT = 40;

// export default function ProductDetailsCardView() {
//   const { productId } = useLocalSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [productData, setProductData] = useState<any>(null);

//   // ... Your existing fetch logic ...

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* The four peeking elements */}
//       <View style={[styles.peekElement, styles.peekTop]} />
//       <View style={[styles.peekElement, styles.peekRight]} />
//       <View style={[styles.peekElement, styles.peekBottom]} />
//       <View style={[styles.peekElement, styles.peekLeft]} />

//       {/* Main focused card */}
//       <View style={styles.cardContainer}>
//         <ProductCard productInfo={productData?.product_results} />
//       </View>
//     </SafeAreaView>
//   );
// }

// function ProductCard({ productInfo }: { productInfo: any }) {
//   if (!productInfo) return null;

//   const { title, rating, reviews, description, media } = productInfo;

//   return (
//     <View style={styles.card}>
//       {/* Product Image */}
//       {Array.isArray(media) && media.length > 0 ? (
//         <Image
//           source={{ uri: media[0].link }}
//           style={styles.productImage}
//           resizeMode="cover"
//         />
//       ) : (
//         <View style={[styles.productImage, styles.noImage]}>
//           <Text>No image</Text>
//         </View>
//       )}

//       {/* Product Info */}
//       <View style={styles.productInfo}>
//         <Text style={styles.title} numberOfLines={2}>
//           {title}
//         </Text>

//         {rating != null && (
//           <Text style={styles.rating}>
//             ★ {rating.toFixed(1)} ({reviews} reviews)
//           </Text>
//         )}

//         <ScrollView style={styles.descriptionScroll}>
//           <Text style={styles.description}>{description}</Text>
//         </ScrollView>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardContainer: {
//     width: CARD_WIDTH,
//     height: CARD_HEIGHT,
//     // Elevation to sit above peek elements
//     zIndex: 2,
//   },
//   card: {
//     flex: 1,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     overflow: 'hidden',
//     // Shadow
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   peekElement: {
//     position: 'absolute',
//     backgroundColor: '#e0e0e0',
//     zIndex: 1,
//   },
//   peekTop: {
//     width: CARD_WIDTH * 0.7,
//     height: PEEK_AMOUNT,
//     top: 0,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     transform: [{ translateY: -PEEK_AMOUNT / 2 }],
//   },
//   peekBottom: {
//     width: CARD_WIDTH * 0.7,
//     height: PEEK_AMOUNT,
//     bottom: 0,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     transform: [{ translateY: PEEK_AMOUNT / 2 }],
//   },
//   peekLeft: {
//     width: PEEK_AMOUNT,
//     height: CARD_HEIGHT * 0.7,
//     left: 0,
//     borderTopRightRadius: 20,
//     borderBottomRightRadius: 20,
//     transform: [{ translateX: -PEEK_AMOUNT / 2 }],
//   },
//   peekRight: {
//     width: PEEK_AMOUNT,
//     height: CARD_HEIGHT * 0.7,
//     right: 0,
//     borderTopLeftRadius: 20,
//     borderBottomLeftRadius: 20,
//     transform: [{ translateX: PEEK_AMOUNT / 2 }],
//   },
//   productImage: {
//     width: '100%',
//     height: CARD_HEIGHT * 0.4,
//   },
//   noImage: {
//     backgroundColor: '#f5f5f5',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   productInfo: {
//     flex: 1,
//     padding: 15,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   rating: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 12,
//   },
//   descriptionScroll: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     padding: 10,
//   },
//   description: {
//     fontSize: 14,
//     color: '#333',
//     lineHeight: 20,
//   },
// });












// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   SafeAreaView,
//   Image,
//   ScrollView,
// } from 'react-native';
// import {
//   PanGestureHandler,
//   PanGestureHandlerGestureEvent,
// } from 'react-native-gesture-handler';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   useAnimatedGestureHandler,
//   withSpring,
//   runOnJS,
// } from 'react-native-reanimated';
// import { useLocalSearchParams } from 'expo-router';

// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// const CARD_WIDTH = SCREEN_WIDTH * 0.85;
// const CARD_HEIGHT = SCREEN_HEIGHT * 0.75;
// const PEEK_AMOUNT = 40;
// const SWIPE_THRESHOLD = 50; // How many pixels to swipe before triggering card change

// // Virtual positions in our "grid"
// type Position = {
//   x: number;
//   y: number;
// };

// export default function ProductDetailsCardView() {
//   const { productId } = useLocalSearchParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [productData, setProductData] = useState<any>(null);
//   const [currentPosition, setCurrentPosition] = useState<Position>({ x: 0, y: 0 });

//   // Animation values for the card movement
//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);

//   useEffect(() => {
//     fetchProductDetails();
//   }, [productId]);

//   const fetchProductDetails = async () => {
//     if (!productId) {
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch('http://localhost:8081/api/productDetails', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ product_id: productId }),
//       });

//       if (!response.ok) throw new Error(`Error: ${response.status}`);
//       const data = await response.json();
//       setProductData(data);
//     } catch (err: any) {
//       setError(err.message ?? 'Failed to fetch product details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const moveToPosition = (newPos: Position) => {
//     setCurrentPosition(newPos);
//   };

//   const gestureHandler = useAnimatedGestureHandler<
//     PanGestureHandlerGestureEvent,
//     { startX: number; startY: number }
//   >({
//     onStart: (_, ctx) => {
//       ctx.startX = translateX.value;
//       ctx.startY = translateY.value;
//     },
//     onActive: (event, ctx) => {
//       translateX.value = ctx.startX + event.translationX;
//       translateY.value = ctx.startY + event.translationY;
//     },
//     onEnd: (event) => {
//       // Determine if we should snap to a new position
//       const shouldMoveX = Math.abs(event.translationX) > SWIPE_THRESHOLD;
//       const shouldMoveY = Math.abs(event.translationY) > SWIPE_THRESHOLD;

//       let newPos = { ...currentPosition };

//       if (shouldMoveX) {
//         newPos.x += event.translationX > 0 ? 1 : -1;
//       }
//       if (shouldMoveY) {
//         newPos.y += event.translationY > 0 ? 1 : -1;
//       }

//       // Limit movement to one step in any direction
//       newPos.x = Math.max(-1, Math.min(1, newPos.x));
//       newPos.y = Math.max(-1, Math.min(1, newPos.y));

//       // Animate back to center
//       translateX.value = withSpring(0);
//       translateY.value = withSpring(0);

//       // Update position if we moved
//       if (shouldMoveX || shouldMoveY) {
//         runOnJS(moveToPosition)(newPos);
//       }
//     },
//   });

//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [
//       { translateX: translateX.value },
//       { translateY: translateY.value },
//     ],
//   }));

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text>Loading...</Text>
//       </SafeAreaView>
//     );
//   }

//   if (error || !productData) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text>{error || 'No product data available'}</Text>
//       </SafeAreaView>
//     );
//   }

//   const productInfo = productData.product_results;

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Peek elements */}
//       <View style={[styles.peekElement, styles.peekTop]} />
//       <View style={[styles.peekElement, styles.peekRight]} />
//       <View style={[styles.peekElement, styles.peekBottom]} />
//       <View style={[styles.peekElement, styles.peekLeft]} />

//       {/* Main card with gesture handling */}
//       <PanGestureHandler onGestureEvent={gestureHandler}>
//         <Animated.View style={[styles.cardContainer, animatedStyle]}>
//           <ProductCard 
//             productInfo={productInfo}
//             position={currentPosition}
//           />
//         </Animated.View>
//       </PanGestureHandler>

//       {/* Position indicator (for debugging) */}
//       <Text style={styles.positionIndicator}>
//         Position: ({currentPosition.x}, {currentPosition.y})
//       </Text>
//     </SafeAreaView>
//   );
// }

// function ProductCard({ 
//   productInfo,
//   position
// }: { 
//   productInfo: any;
//   position: Position;
// }) {
//   const { title, rating, reviews, description, media } = productInfo;

//   // Add some visual variation based on position
//   // (until real recommendations are implemented)
//   const positionLabel = position.x === 0 && position.y === 0 
//     ? 'Main Product'
//     : `Similar Product (${position.x}, ${position.y})`;

//   return (
//     <View style={styles.card}>
//       {Array.isArray(media) && media.length > 0 ? (
//         <Image
//           source={{ uri: media[0].link }}
//           style={styles.productImage}
//           resizeMode="cover"
//         />
//       ) : (
//         <View style={[styles.productImage, styles.noImage]}>
//           <Text>No image</Text>
//         </View>
//       )}

//       <View style={styles.productInfo}>
//         <Text style={styles.positionLabel}>{positionLabel}</Text>
//         <Text style={styles.title} numberOfLines={2}>
//           {title}
//         </Text>

//         {rating != null && (
//           <Text style={styles.rating}>
//             ★ {rating.toFixed(1)} ({reviews} reviews)
//           </Text>
//         )}

//         <ScrollView style={styles.descriptionScroll}>
//           <Text style={styles.description}>{description}</Text>
//         </ScrollView>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardContainer: {
//     width: CARD_WIDTH,
//     height: CARD_HEIGHT,
//     zIndex: 2,
//   },
//   card: {
//     flex: 1,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   peekElement: {
//     position: 'absolute',
//     backgroundColor: '#e0e0e0',
//     zIndex: 1,
//   },
//   peekTop: {
//     width: CARD_WIDTH * 0.7,
//     height: PEEK_AMOUNT,
//     top: 0,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     transform: [{ translateY: -PEEK_AMOUNT / 2 }],
//   },
//   peekBottom: {
//     width: CARD_WIDTH * 0.7,
//     height: PEEK_AMOUNT,
//     bottom: 0,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     transform: [{ translateY: PEEK_AMOUNT / 2 }],
//   },
//   peekLeft: {
//     width: PEEK_AMOUNT,
//     height: CARD_HEIGHT * 0.7,
//     left: 0,
//     borderTopRightRadius: 20,
//     borderBottomRightRadius: 20,
//     transform: [{ translateX: -PEEK_AMOUNT / 2 }],
//   },
//   peekRight: {
//     width: PEEK_AMOUNT,
//     height: CARD_HEIGHT * 0.7,
//     right: 0,
//     borderTopLeftRadius: 20,
//     borderBottomLeftRadius: 20,
//     transform: [{ translateX: PEEK_AMOUNT / 2 }],
//   },
//   productImage: {
//     width: '100%',
//     height: CARD_HEIGHT * 0.4,
//   },
//   noImage: {
//     backgroundColor: '#f5f5f5',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   productInfo: {
//     flex: 1,
//     padding: 15,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   rating: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 12,
//   },
//   descriptionScroll: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     padding: 10,
//   },
//   description: {
//     fontSize: 14,
//     color: '#333',
//     lineHeight: 20,
//   },
//   positionIndicator: {
//     position: 'absolute',
//     bottom: 20,
//     fontSize: 12,
//     color: '#666',
//   },
//   positionLabel: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 4,
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useLocalSearchParams } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const CARD_WIDTH = SCREEN_WIDTH * 0.85;
const CARD_HEIGHT = SCREEN_HEIGHT * 0.75;
const PEEK_AMOUNT = 40;
const SWIPE_THRESHOLD = 50;

interface Product {
  product_id: string;
  title: string;
  price: string;
  rating?: number;
  reviews?: number;
  description?: string;
  thumbnail?: string;
  source?: string;
}

export default function ProductDetailsCardView() {
  const params = useLocalSearchParams();
  const selectedProductId = params.selectedProductId as string;
  
  // Parse the products list from params
  const allProducts = params.productsList ? 
    JSON.parse(params.productsList as string) : [];
  
  // Find the initial index of the selected product
  const initialIndex = allProducts.findIndex(
    (p: Product) => p.product_id === selectedProductId
  );

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Get adjacent product indices
  const getAdjacentIndices = () => {
    return {
      prev: currentIndex > 0 ? currentIndex - 1 : null,
      next: currentIndex < allProducts.length - 1 ? currentIndex + 1 : null,
    };
  };

  const { prev, next } = getAdjacentIndices();

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startX: number; startY: number }
  >({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      // Allow some horizontal movement for the animation feel
      translateX.value = ctx.startX + event.translationX * 0.2; // Reduced horizontal movement
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      const shouldMoveY = Math.abs(event.translationY) > SWIPE_THRESHOLD;
      
      if (shouldMoveY) {
        // Moving down (positive translation) means next product
        // Moving up (negative translation) means previous product
        const isMovingDown = event.translationY > 0;
        
        if (isMovingDown && next !== null) {
          runOnJS(setCurrentIndex)(currentIndex + 1);
        } else if (!isMovingDown && prev !== null) {
          runOnJS(setCurrentIndex)(currentIndex - 1);
        }
      }

      // Always spring back to center
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      // Add a slight rotation based on horizontal movement for visual feedback
      { rotate: `${translateX.value * 0.01}deg` },
    ],
  }));

  if (!allProducts.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No products available</Text>
      </SafeAreaView>
    );
  }

  const currentProduct = allProducts[currentIndex];
  console.log("currentProduct")
  console.log(currentProduct)
  console.log("currentProductEnd")
  console.log("\n")
  console.log("allProducts")
  console.log(allProducts)
  console.log("allProductsEnd")



  return (
    <SafeAreaView style={styles.container}>
      {/* Show peek elements only if there are adjacent products */}
      {prev !== null && <View style={[styles.peekElement, styles.peekTop]} />}
      {next !== null && <View style={[styles.peekElement, styles.peekBottom]} />}

      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.cardContainer, animatedStyle]}>
          <ProductCard 
            product={currentProduct}
            position={currentIndex + 1}
            total={allProducts.length}
          />
        </Animated.View>
      </PanGestureHandler>

      {/* Optional: Add visual indicators for navigation */}
      <View style={styles.navigationHints}>
        {prev !== null && (
          <Text style={styles.navigationHint}>↑ Previous product</Text>
        )}
        {next !== null && (
          <Text style={styles.navigationHint}>↓ Next product</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

function ProductCard({ 
  product,
  position,
  total
}: { 
  product: Product;
  position: number;
  total: number;
}) {
  const { title, price, rating, reviews, description, thumbnail, source } = product;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: thumbnail }}
        style={styles.productImage}
        resizeMode="cover"
      />

      <View style={styles.productInfo}>
        <Text style={styles.positionIndicator}>
          {position} of {total}
        </Text>
        
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <Text style={styles.price}>{price}</Text>

        {rating != null && (
          <Text style={styles.rating}>
            ★ {rating.toFixed(1)} ({reviews} reviews)
          </Text>
        )}

        {source && (
          <Text style={styles.source}>
            Sold by: {source}
          </Text>
        )}

        <ScrollView style={styles.descriptionScroll}>
          <Text style={styles.description}>{description || 'No description available'}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    zIndex: 2,
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  peekElement: {
    position: 'absolute',
    backgroundColor: '#e0e0e0',
    zIndex: 1,
  },
  peekTop: {
    width: CARD_WIDTH * 0.7,
    height: PEEK_AMOUNT,
    top: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    transform: [{ translateY: -PEEK_AMOUNT / 2 }],
  },
  peekBottom: {
    width: CARD_WIDTH * 0.7,
    height: PEEK_AMOUNT,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    transform: [{ translateY: PEEK_AMOUNT / 2 }],
  },
  productImage: {
    width: '100%',
    height: CARD_HEIGHT * 0.4,
    backgroundColor: '#f5f5f5',
  },
  productInfo: {
    flex: 1,
    padding: 15,
  },
  positionIndicator: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563eb',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  source: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  descriptionScroll: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  navigationHints: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  navigationHint: {
    fontSize: 12,
    color: '#666',
    marginVertical: 2,
  },
});