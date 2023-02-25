import React, { memo, useState, useEffect } from 'react';
import { Navigation } from '../types';
import { StyleSheet, ScrollView } from 'react-native';
import { Text, DataTable } from 'react-native-paper';
import axios from 'axios';

type Props = {
    navigation: Navigation;
};

const DBScreen = ({ navigation }: Props) => {
    const [children, setChildren] = useState([]);

    // Runs on component mount
    useEffect(() => {
        axios
            .get('https://cis-linux2.temple.edu/bucketlistBackend/database')
            .then((res) => {
                const rows = res.data.rows.map((row) => (
                    <DataTable.Row key={row.id}>
                        <DataTable.Cell>{row.id}</DataTable.Cell>
                        <DataTable.Cell>{row.username}</DataTable.Cell>
                        <DataTable.Cell>{row.email}</DataTable.Cell>
                        <DataTable.Cell>{row.password}</DataTable.Cell>
                    </DataTable.Row>
                ));
                const table = (
                    <DataTable key={children.length}>
                        <DataTable.Header>
                            <DataTable.Title>ID</DataTable.Title>
                            <DataTable.Title>Username</DataTable.Title>
                            <DataTable.Title>Email</DataTable.Title>
                            <DataTable.Title>Password</DataTable.Title>
                        </DataTable.Header>
                        {rows}
                    </DataTable>
                );
                setChildren((arr) => [...arr, table]);
            })
            .catch((err) => console.log(err));
    }, []);

    return <ScrollView vertical>{children}</ScrollView>;
};

export default memo(DBScreen);
