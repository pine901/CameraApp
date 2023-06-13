import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';

const VIEW_BOX_WIDTH = 100; // Adjust this value to change the width of each slide

function ViewSlider() {
    const [activeSlide, setActiveSlide] = React.useState(0);

    const slides = [
        <View style={styles.slide}>
            {/* Slide content for Slide 1 */}
        </View>,
        <View style={styles.slide}>
            {/* Slide content for Slide 2 */}
        </View>,
        <View style={styles.slide}>
            {/* Slide content for Slide 3 */}
        </View>,
    ];

    const renderItem = ({ item, index }) => (
        <View style={[styles.paginationItem, activeSlide == index && styles.activeItem]}>
            {/* Pagination dot for each slide */}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                data={slides}
                renderItem={({ item }) => item}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.slideContainer}
                pagingEnabled
                onMomentumScrollEnd={event => setActiveSlide(Math.floor(event.nativeEvent.contentOffset.x / VIEW_BOX_WIDTH))}
            />
            <View style={styles.paginationContainer}>
                <FlatList
                    horizontal
                    data={slides}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.pagination}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slideContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    slide: {
        width: VIEW_BOX_WIDTH,
        height: 200,
        backgroundColor: '#e5e5e5', // Example background color
        borderRadius: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10, // Adjust this value to add padding within the slide if needed
    },
    paginationContainer: {
        height: 15, // Height of the pagination container
        paddingHorizontal: 10, // Horizontal padding of the pagination container
        alignItems: 'center',
        justifyContent: 'center',
    },
    pagination: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationItem: {
        width: 8, // Width of each pagination item dot
        height: 8, // Height of each pagination item dot
        borderRadius: 4,
        marginHorizontal: 3, // Space between each pagination item dot
        backgroundColor: '#c4c4c4', // Example inactive color
    },
    activeItem: {
        backgroundColor: '#000', // Example active color
    },
});

export default ViewSlider;