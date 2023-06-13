import React, { useState, useEffect } from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';

const LoadingComponent = ({isLoading}) => {
    
    return (
        <Modal visible={isLoading} transparent={true}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                <ActivityIndicator size="large" color="rgba(54, 52, 53, 1)" />
            </View>
        </Modal>
    )
}

export default LoadingComponent;