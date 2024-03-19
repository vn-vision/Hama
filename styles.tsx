import { StyleSheet } from 'react-native'

export const PRI_COLOR = '#f8f8ff';
export const SEC_COLOR = '#6A0DAD';
export const THR_COLOR = '#8A2BE2';
export const FTH_COLOR = '#FFFFFF';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: PRI_COLOR,
    },
    content: {
      flex: 1,
    },
    nav_container: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: SEC_COLOR,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
      },
    navItem: {
       marginRight: 10,
       color: FTH_COLOR,
      },
    listContentContainer: {
      paddingHorizontal: 5,
      paddingTop: 20,
      justifyContent: 'space-between',
    },
    welcome: {
      marginTop: '10%',
      marginHorizontal: '5%'
    },
    greeting: {
      fontSize: 28,
      fontFamily: 'Georgia',
      fontWeight: 'bold',
      marginBottom: '5%',
      color: THR_COLOR,
    },
    greetingStmt: {
      fontSize: 20,
      fontFamily: 'Georgia',
      letterSpacing: 0.5,
      lineHeight: 24,
      color: THR_COLOR,
    },
    LPElements: {
      marginTop: '25%',
    },
    landscapeContainer: {
        flexDirection: "row",
        flex: 1,
      },
      portraitContainer: {
        flex: 1,
      },
      viewingAreaLandscape: {
        flex: 0.8,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
      },
      viewingAreaPortrait: {
        flex: 0.5,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
      },
      cardIconsLandscape: {
        flex: 0.2,
        padding: 20,
      },
      cardIconsPortrait: {
        flex: 0.5,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 20,
      },
      pressableContainer: {
        backgroundColor: SEC_COLOR,
        padding: 20,
        margin: '1%',
        minWidth:'48%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // space between icons and title
        elevation: 3, // for shadow (Android)
        shadowColor: '#000', // for shadow (iOS)
        shadowOffset: { width: 0, height: 2 }, // for shadow (iOS)
        shadowOpacity: 0.25, // for shadow (iOS)
        shadowRadius: 3.84, // for shadow (iOS)
      },
      iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      icon: {
        marginRight:10,
        color: FTH_COLOR,
      },
      title: {
        fontSize: 18,
        color: FTH_COLOR
      },
      titleContainer: {
        flex:2,
        color: FTH_COLOR
      },
      bleView: {
        margin: 10,
        color: THR_COLOR,
        flex:2,

      }
  });

  export default styles;