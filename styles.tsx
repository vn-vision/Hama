import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
      },
    navItem: {
        padding: 10,
      },
    listContentContainer: {
      paddingHorizontal: 5,
      paddingTop: 20,
      justifyContent: 'space-between',
    },
    welcome: {
      marginTop: 30,
      marginHorizontal: 10
    },
    greeting: {
      fontSize: 28,
      fontFamily: 'Georgia',
      fontWeight: 'bold',
      marginBottom: 10,
    },
    greetingStmt: {
      fontSize: 20,
      fontFamily: 'Georgia',
      letterSpacing: 0.5,
      lineHeight: 24,
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
  });

  export default styles;