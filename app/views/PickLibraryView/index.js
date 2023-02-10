import React, { useEffect, useState, useRef } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import CameraRoll from '@react-native-camera-roll/camera-roll'
import { withTheme } from '../../theme'
import sharedStyles from '../Styles'
import StatusBar from '../../containers/StatusBar'
import styles from './styles'
import SafeAreaView from '../../containers/SafeAreaView'
import { setUser as setUserAction } from '../../actions/login'
import * as HeaderButton from '../../containers/HeaderButton'
import ActivityIndicator from '../../containers/ActivityIndicator'
import { POST_TYPE_PHOTO, POST_TYPE_VIDEO } from '../../constants/app'
import I18n from '../../i18n'
import { themes } from '../../constants/colors'

const PickLibraryView = (props) => {
  const type = props.route.params?.type ?? POST_TYPE_PHOTO
  const [state, setState] = useState({
    type,
    select_image_index: null,
    playing: false,
    text: '',
    isLoading: true,
    data: [],
    showGallery: true,
    currentSideIndex: null,
  })
  const { theme } = props
  const { isLoading, data, select_image_index, showGallery } = state
  const swipe = useRef(null)

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    navigateHeader()
  }, [select_image_index])

  const setSafeState = (states) => {
    setState({ ...state, ...states })
  }

  const navigateHeader = () => {
    const { navigation } = props
    navigation.setOptions({
      title: I18n.t('New_post'),
      headerRight: () => (
        <HeaderButton.Next
          onPress={onNext}
          testID="rooms-list-view-sidebar"
        />
      ),
    })
  }

  const init = async () => {
    const { type } = state

    navigateHeader()
    CameraRoll.getPhotos({
      first: 1,
      assetType: type === POST_TYPE_VIDEO ? 'Videos' : 'Photos',
    })
      .then(res => {
        console.log('access')
    //     const images = res.edges.map(e => ({ uri: e.node.image.uri }))
    //     setSafeState({
    //       data: images,
    //       isLoading: false,
    //       select_image_index: images.length ? 0 : null,
    //     })
      })
      .catch(error => {
    //     setSafeState({ isLoading: false })
    //     console.log(error)
      })
  }

  const onNext = () => {
    const { data, select_image_index, type } = state
    const { navigation } = props
    console.log(select_image_index)
    if (select_image_index !== null) {
      navigation.push('CreatePost', {
        type: type,
        file_path: data[select_image_index].uri,
      })
    }
  }

  const renderSlides = () => {
    let sides = []
    const { data } = state
    data.forEach((item, index) => {
      sides.push(
        <TouchableOpacity
          activeOpacity={1}
          style={styles.slide}
          key={index}
          onPress={() => setState({ ...state, showGallery: false })}>
          <Image
            source={{ uri: item.uri }}
            style={styles.slideImage}
            resizeMode={'contain'}
          />
        </TouchableOpacity>,
      )
    })
    return sides
  }

  const renderImage = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => setState({ ...state, select_image_index: index })}
      style={{ width: '31%', margin: 4 }}>
      <Image
        key={index}
        style={{
          width: '100%',
          height: 140,
        }}
        resizeMode={'cover'}
        source={{ uri: item.uri }}
      />
    </TouchableOpacity>
  )

  return (
    <View style={[sharedStyles.container, { backgroundColor: themes[theme].navbarBackground }]}>
      <SafeAreaView style={[sharedStyles.contentContainer, {
        backgroundColor: themes[theme].backgroundColor,
        paddingTo: 20,
        paddingHorizontal: 20,
      }]}>
        <StatusBar />
        {
          isLoading && (
          <ActivityIndicator absolute theme={theme} size={'large'} />
        )}
        {data.length ? (
          <>
            <TouchableOpacity
              style={[styles.selectImageContainer, { borderRadius: 20, overflow: 'hidden' }]}
              onPress={() => setState({ ...state, showGallery: true })}>
              <Image
                source={{ uri: data[select_image_index].uri }}
                style={styles.selectImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
            <Text style={[styles.recentText, { color: themes[theme].activeTintColor }]}>{I18n.t('Recent')}</Text>
            <FlatList
              data={data}
              style={{ flex: 1 }}
              contentContainerStyle={{ alignItems: 'center' }}
              numColumns={3}
              renderItem={renderImage}
            />
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Text
              style={[styles.emptyText, { color: themes[theme].activeTintColor }]}>{I18n.t('No_files_in_device')}</Text>
          </View>
        )}
        {showGallery && (
          <View style={styles.galleryView}>
            <Text style={styles.topCategoryTitle}>[ ----- Swiper Slider Content ----- ] </Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  )
}

const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(PickLibraryView))


//
// renderForm = () => {
//     const {type, text, file_path, thumbnail, playing} = this.state;
//     const {theme} = this.props;
//     switch (type){
//         case POST_TYPE_TEXT:
//             return (
//                 <View style={styles.inputContainer}>
//                     <CsTextInput
//                         inputRef={(e) => {
//                             this.textInput = e;
//                         }}
//                         containerStyle={styles.roundInput}
//                         inputStyle={styles.textStyle}
//                         wrapStyle={{alignItems: 'flex-start', paddingVertical: 12}}
//                         returnKeyType='send'
//                         keyboardType='default'
//                         onChangeText={text => this.setState({text})}
//                         multiline={true}
//                         theme={theme}
//                     />
//                 </View>
//             );
//         case POST_TYPE_PHOTO:
//             return (
//                 <View style={styles.inputContainer}>
//                     <Image source={{uri: file_path}} style={styles.imageStyle}/>
//                     <CsTextInput
//                         inputRef={(e) => {
//                             this.textInput = e;
//                         }}
//                         containerStyle={styles.underlineInput}
//                         placeholder={I18n.t('Photo_post_placeholder')}
//                         returnKeyType='send'
//                         keyboardType='default'
//                         onChangeText={text => this.setState({text})}
//                         theme={theme}
//                     />
//                 </View>
//             )
//         case POST_TYPE_VIDEO:
//             return (
//                 <View style={styles.inputContainer}>
//                     {   playing &&
//                         <Video
//                             source={{uri: file_path}}
//                             style={styles.video}
//                             controls
//                             onEnd={() => this.setState({playing: false})}
//                             resizeMode={'contain'}/>
//                     }
//                     {
//                         thumbnail && !playing &&
//                         <View style={styles.thumbnailContainer}>
//                             <Image
//                                 source={{uri: thumbnail}}
//                                 style={styles.thumbnail}
//                                 resizeMode={'contain'}
//                             />
//                             <TouchableOpacity onPress={() => this.setState({playing: true})} style={[styles.playIcon, { position: 'absolute' }]}>
//                                 <VectorIcon
//                                     name='playcircleo'
//                                     type={'AntDesign'}
//                                     size={72}
//                                     color={'white'}
//                                 />
//                             </TouchableOpacity>
//                         </View>
//                     }
//                     <CsTextInput
//                         inputRef={(e) => {
//                             this.textInput = e;
//                         }}
//                         containerStyle={styles.underlineInput}
//                         placeholder={I18n.t('Video_post_placeholder')}
//                         returnKeyType='send'
//                         keyboardType='default'
//                         onChangeText={text => this.setState({text})}
//                         multiline={true}
//                         theme={theme}
//                     />
//                 </View>
//             )
//     }
//     return null;
// }
