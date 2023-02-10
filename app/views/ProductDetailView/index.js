import React, { useState, useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'

import StatusBar from '../../containers/StatusBar'
import { withTheme } from '../../theme'
import styles from './styles'
import { addToCart as addToCartAction } from '../../actions/cart'
import MainScreen from '../../containers/MainScreen'
import * as HeaderButton from '../../containers/HeaderButton'
import { GradientHeader } from '../../containers/GradientHeader'
import scrollPersistTaps from '../../utils/scrollPersistTaps'
import { COLOR_YELLOW } from '../../constants/colors'
import I18n from '../../i18n'
import firebaseSdk from '../../lib/firebaseSdk'

const ProductDetailView = (props) => {
  const productData = props.route.params?.product
  const [state, setState] = useState({
    product: productData,
    target_product_item: {
      id: productData.id,
      name: productData.name,
      name_kana: productData.name_kana,
      caption: productData.caption,
      size: productData.sizes ? productData.sizes[0] : null,
      color: productData.colors ? productData.colors[0].id : null,
      image_url: productData.image_url,
      price: productData.price,
    },
  })
  const { navigation } = props
  const { product, target_product_item } = state

  useEffect(() => {
    init(product.id)
  }, [])

  const setSafeState = (states) => {
    setState({ ...state, ...states })
  }

  const init = async id => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButton.Drawer
          navigation={navigation}
          testID="rooms-list-view-sidebar"
        />
      ),
      title: product.name,
      headerRight: () => (
        <HeaderButton.Cart
          title="menu"
          navigation={navigation}
          testID="rooms-list-view-create-channel"
        />
      ),
      headerBackground: () => <GradientHeader />,
    })

    await firestore()
      .collection(firebaseSdk.TBL_PRODUCTS)
      .doc(id)
      .get()
      .then(querySnapShot => {
        const product = querySnapShot.data()
        console.log('product', product)
        setSafeState({
          product: { id: querySnapShot.id, ...product },
          target_product_item: {
            id: product.id,
            name_kana: product.name_kana,
            name: product.name,
            caption: product.caption,
            size: product.sizes ? product.sizes[0] : null,
            color: product.colors ? product.colors[0].id : null,
            image_url: product.colors
              ? product.colors[0].image_url
              : product.image_url,
            price: product.price,
          },
        })
      })
  }

  const renderSize = () => {
    let sides = []
    const { category } = state
    category.images.forEach(c => {
      sides.push(
        <View style={styles.colorItemContainer}>
          <Image source={{ uri: c }} style={styles.colorImage} key={c.id} />
          <Text style={styles.colorText}>{category.name_kana}</Text>
        </View>,
      )
    })
    return sides
  }

  const onSelectColor = color => {
    setState({
      ...state,
      target_product_item: {
        ...state.target_product_item,
        color: color.id,
        image_url: color.image_url,
      },
    })
  }

  const onSelectSize = size => {
    setState({
      ...state,
      target_product_item: { ...state.target_product_item, size },
    })
  }

  const onAddCart = () => {
    const { addToCart } = props
    const { target_product_item } = state
    const cartProduct = {
      ...target_product_item,
      quantity: 1,
    }
    addToCart(cartProduct)
    props.navigation.replace('CheckOut')
  }

  return (
    <MainScreen navigation={navigation}>
      <StatusBar />
      <ScrollView
        {...scrollPersistTaps}
        contentContainerStyle={styles.container}>
        <View style={styles.productContainer}>
          <Text style={styles.productTitle}>{product.name_kana}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productCaption}>{product.caption}</Text>
          <Image
            source={{ uri: target_product_item.image_url }}
            style={styles.productImage}
          />
        </View>

        <View style={styles.sizeContainer}>
          <Text style={styles.variantTitle}>{I18n.t('choose_size')}</Text>
          <View style={styles.sizeContent}>
            {product.sizes
              ? product.sizes.map(s => (
                <TouchableOpacity
                  style={
                    s === target_product_item.size
                      ? styles.selectItemContainer
                      : styles.itemContainer
                  }
                  onPress={() => onSelectSize(s)}>
                  <Text style={styles.itemText}>{s}</Text>
                </TouchableOpacity>
              ))
              : null}
          </View>
        </View>
        <View style={styles.colorContainer}>
          <Text style={styles.variantTitle}>{I18n.t('choose_color')}</Text>
          <ScrollView
            horizontal={true}
            {...scrollPersistTaps}
            showsHorizontalScrollIndicator={false}
            style={styles.colorContent}>
            {product.colors
              ? product.colors.map(c => (
                <TouchableOpacity
                  style={styles.colorItemContainer}
                  onPress={() => onSelectColor(c)}>
                  <Image
                    source={{ uri: c.image_url }}
                    style={styles.colorImage}
                    key={c.id}
                  />
                  <Text
                    style={
                      c.id === target_product_item.color
                        ? styles.selectColorText
                        : styles.colorText
                    }>
                    {c.text}
                  </Text>
                </TouchableOpacity>
              ))
              : null}
          </ScrollView>
        </View>
        <View style={styles.targetProductItem}>
          <Text style={styles.targetProductTitle}>
            {target_product_item.name_kana}
          </Text>
          <Text style={styles.targetProductVariant}>
            {target_product_item.size} {target_product_item.color}
          </Text>
          <Text style={styles.targetProductPrice}>
            ${target_product_item.price}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: COLOR_YELLOW }]}
          onPress={() => onAddCart()}>
          <Text style={styles.actionText}>{I18n.t('Place_order')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </MainScreen>
  )
}

const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
  addToCart: params => dispatch(addToCartAction(params)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(ProductDetailView))
