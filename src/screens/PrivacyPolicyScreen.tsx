import { Box, Divider, Heading, Text, VStack } from 'native-base';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const PrivacyPolicyScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Box>
                <VStack alignSelf="center" maxW="80%" mb="100">
                    <Heading mt="5">Privacy Policy</Heading>
                    <Divider mt="2" mb="2" />
                    <VStack space="2" mb="100" alignContent="center">
                        <Text style={styles.paragraph}>
                            We at 2023 Temple University SP23 BucketList Project
                            Team respect the privacy of our users and are
                            committed to protecting their personal information.
                            This Privacy Policy explains how we collect, use,
                            and disclose information in connection with our web
                            application Bucketlist (the "Web Application").
                        </Text>
                        <Text style={styles.subHeading}>
                            1. Information Collection
                        </Text>
                        <Text style={styles.paragraph}>
                            We collect personal information from our users when
                            they register to use our Web Application or when
                            they provide us with information by using our Web
                            Application. This personal information may include:
                        </Text>
                        <VStack ml="5">
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>Name
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>Email address
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>Location
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>Personal goals
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>Date of birth
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>Gender
                            </Text>
                        </VStack>
                        <Text style={styles.paragraph}>
                            We may also collect non-personal information about
                            our users, such as their IP address and browser
                            type, for the purpose of analytics and to improve
                            our Web Application.
                        </Text>
                        <Text style={styles.subHeading}>
                            2. Use of Information
                        </Text>
                        <Text style={styles.paragraph}>
                            We use the information collected from our users for
                            the following purposes:
                        </Text>
                        <VStack ml="5">
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>
                                To provide our Web Application and related
                                services
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>
                                To communicate with our users about our Web
                                Application and related services
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>To personalize our
                                users' experience with our Web Application
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>To analyze and
                                improve our Web Application
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>To enforce our
                                Terms of Service and other policies
                            </Text>
                        </VStack>

                        <Text style={styles.subHeading}>
                            3. Disclosure of Information
                        </Text>
                        <Text style={styles.paragraph}>
                            We may disclose personal information to third
                            parties in the following circumstances:
                        </Text>
                        <VStack ml="5">
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>With the user's
                                consent
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>To comply with
                                applicable law or legal process
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>To protect the
                                safety or security of our users or others
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>In connection with
                                a merger, acquisition, or sale of all or
                                substantially all of our assets
                            </Text>
                        </VStack>
                        <Text style={styles.paragraph}>
                            We may also share non-personal information with
                            third parties for analytics and advertising
                            purposes.
                        </Text>
                        <Text style={styles.subHeading}>4. Security</Text>
                        <Text style={styles.paragraph}>
                            We take reasonable measures to protect the personal
                            information of our users from unauthorized access,
                            disclosure, or use. However, no security system is
                            completely secure, and we cannot guarantee the
                            security of our users' information.
                        </Text>
                        <Text style={styles.subHeading}>
                            5. Third-Party Links
                        </Text>
                        <Text style={styles.paragraph}>
                            Our Web Application may contain links to third-party
                            websites or services. We are not responsible for the
                            privacy practices or content of these third-party
                            websites or services. We encourage our users to read
                            the privacy policies of these third-party websites
                            or services before using them.
                        </Text>
                        <Text style={styles.subHeading}>
                            6. Children's Privacy
                        </Text>
                        <Text style={styles.paragraph}>
                            Our Web Application is not directed at children
                            under the age of 13. We do not knowingly collect
                            personal information from children under the age of
                            13. If we become aware that we have collected
                            personal information from a child under the age of
                            13, we will take steps to delete such information.
                        </Text>
                        <Text style={styles.subHeading}>
                            7. Changes to Privacy Policy
                        </Text>
                        <Text style={styles.paragraph}>
                            We reserve the right to modify or update this
                            Privacy Policy at any time. If we make material
                            changes to this Privacy Policy, we will notify our
                            users by email or by posting a notice on our Web
                            Application. Your continued use of our Web
                            Application after any such changes constitutes your
                            acceptance of the new Privacy Policy. If you do not
                            agree to any of the terms of this Privacy Policy, do
                            not use or access (or continue to use or access) our
                            Web Application.
                        </Text>
                        <Text style={styles.subHeading}>8. Contact Us</Text>
                        <Text style={styles.paragraph}>
                            If you have any questions or concerns about this
                            Privacy Policy, please contact us at
                            sp23projectteam1@gmail.com.
                        </Text>
                    </VStack>
                </VStack>
            </Box>
        </ScrollView>
    );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
    container: {
        maxWidth: '100%'
    },
    subHeading: {
        marginVertical: 4,
        fontSize: 18,
        fontWeight: '600'
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 22
    }
});
