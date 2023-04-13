import { Box, Divider, Heading, ScrollView, Text, VStack } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FooterView } from '../components';

const TermsScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Box>
                <VStack alignSelf="center" maxW="80%">
                    <Heading mt="5">Terms of Service</Heading>
                    <Divider mt="2" mb="2" />
                    <VStack space="2" mb="5" alignContent="center">
                        <Text style={styles.subHeading}>
                            1. Acceptance of Terms
                        </Text>
                        <Text style={styles.paragraph}>
                            By accessing or using our web application, you agree
                            to these Terms of Service, as well as any additional
                            terms and conditions that may be posted on our web
                            application from time to time. If you do not agree
                            to these terms, please do not use our web
                            application.
                        </Text>
                        <Text style={styles.subHeading}>2. User Conduct</Text>
                        <Text style={styles.paragraph}>
                            You agree to use our web application only for lawful
                            purposes and in a manner consistent with these Terms
                            of Service. You agree not to use our web
                            application:
                        </Text>
                        <VStack ml="5" space={2} maxW="90%">
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>
                                To impersonate any person or entity or falsely
                                state or otherwise misrepresent your affiliation
                                with a person or entity.
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>
                                To upload, post, or otherwise transmit any
                                content that is unlawful, harmful, threatening,
                                abusive, harassing, tortious, defamatory,
                                vulgar, obscene, libelous, invasive of another's
                                privacy, hateful, or racially, ethnically, or
                                otherwise objectionable.
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>
                                To upload, post, or otherwise transmit any
                                content that you do not have a right to transmit
                                under any law or under contractual or fiduciary
                                relationships.
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>
                                To upload, post, or otherwise transmit any
                                content that infringes any patent, trademark,
                                trade secret, copyright, or other proprietary
                                rights of any party.
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>
                                To upload, post, or otherwise transmit any
                                unsolicited or unauthorized advertising,
                                promotional materials, "junk mail," "spam,"
                                "chain letters," "pyramid schemes," or any other
                                form of solicitation.
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>
                                To upload, post, or otherwise transmit any
                                material that contains software viruses or any
                                other computer code, files, or programs designed
                                to interrupt, destroy, or limit the
                                functionality of any computer software or
                                hardware or telecommunications equipment.
                            </Text>
                            <Text style={styles.paragraph}>
                                <Text bold>{`\u2022 `}</Text>
                                To interfere with or disrupt our web application
                                or servers or networks connected to our web
                                application, or disobey any requirements,
                                procedures, policies, or regulations of networks
                                connected to our web application.
                            </Text>
                        </VStack>

                        <Text style={styles.subHeading}>3. User Content</Text>
                        <Text style={styles.paragraph}>
                            Our web application allows you to post scheduled
                            events, agree to attend events, and share
                            information about yourself, such as personal goals
                            and locations where you will be publicly.
                        </Text>
                        <Text style={styles.paragraph}>
                            You are solely responsible for any content you post
                            on our web application, including any information
                            you share about yourself.
                        </Text>
                        <Text style={styles.paragraph}>
                            You represent and warrant that you own or have the
                            necessary licenses, rights, consents, and
                            permissions to use and authorize us to use all
                            patent, trademark, trade secret, copyright, or other
                            proprietary rights in and to any content you post on
                            our web application.
                        </Text>
                        <Text style={styles.paragraph}>
                            You agree that we may use, modify, adapt, reproduce,
                            distribute, and display any content you post on our
                            web application in any media and for any purpose,
                            including commercial purposes.
                        </Text>
                        <Text style={styles.paragraph}>
                            You grant us a non-exclusive, transferable,
                            sub-licensable, royalty-free, worldwide license to
                            use any content you post on our web application.
                        </Text>
                        <Text style={styles.paragraph}>
                            You also acknowledge that any content you post on
                            our web application may be viewed by other users and
                            may be copied or shared by other users.
                        </Text>
                        <Text style={styles.subHeading}>4. Privacy</Text>
                        <Text style={styles.paragraph}>
                            We are committed to protecting your privacy. Please
                            review our Privacy Policy, which explains how we
                            collect, use, and disclose information that pertains
                            to your privacy. The Privacy Policy is incorporated
                            by reference into these Terms of Service.
                        </Text>
                        <Text style={styles.subHeading}>5. Termination </Text>
                        <Text style={styles.paragraph}>
                            We reserve the right to terminate your access to our
                            web application, without cause or notice, which may
                            result in the forfeiture and destruction of all
                            information associated with your account.
                        </Text>
                        <Text style={styles.paragraph}>
                            All provisions of these Terms of Service that by
                            their nature should survive termination shall
                            survive termination, including, without limitation,
                            ownership provisions, warranty disclaimers,
                            indemnity, and limitations of liability.
                        </Text>
                        <Text style={styles.subHeading}>
                            6. Disclaimer of Warranties
                        </Text>
                        <Text style={styles.paragraph}>
                            Our web application is provided "as is" and "as
                            available" without any representations or warranties
                            of any kind, express or implied. We do not warrant
                            that our web application will be uninterrupted,
                            error-free, or free from viruses or other harmful
                            components.
                        </Text>
                        <Text style={styles.paragraph}>
                            We make no warranties or representations about the
                            accuracy, completeness, or reliability of any
                            content or information provided on our web
                            application. You acknowledge that any reliance on
                            the content and information provided on our web
                            application is at your own risk.
                        </Text>
                        <Text style={styles.paragraph}>
                            We expressly disclaim any warranties of
                            merchantability, fitness for a particular purpose,
                            non-infringement, or title, and any warranties
                            arising from a course of dealing, usage, or trade
                        </Text>
                        <Text style={styles.paragraph}>
                            We do not guarantee that any information or content
                            on our web application is or will be accurate,
                            complete, or current, and we assume no
                            responsibility for updating or correcting any such
                            information or content.
                        </Text>
                        <Text style={styles.paragraph}>
                            You acknowledge that you are solely responsible for
                            any content or information you post on our web
                            application, including any information you share
                            about yourself, and that we are not responsible for
                            the accuracy, completeness, or legality of any such
                            content or information.
                        </Text>
                        <Text style={styles.subHeading}>
                            7. Limitation of Liability
                        </Text>
                        <Text style={styles.paragraph}>
                            In no event shall we be liable for any indirect,
                            incidental, special, consequential, or punitive
                            damages, including, without limitation, loss of
                            profits, data, use, goodwill, or other intangible
                            losses, arising out of or in connection with your
                            use or inability to use our web application, or for
                            any content or information posted on our web
                            application, even if we have been advised of the
                            possibility of such damages.
                        </Text>
                        <Text style={styles.paragraph}>
                            Our liability to you for any cause whatsoever and
                            regardless of the form of the action, will at all
                            times be limited to the amount paid, if any, by you
                            to us for our web application during the 12-month
                            period preceding any claim.
                        </Text>
                        <Text style={styles.subHeading}>
                            8. Indemnification
                        </Text>
                        <Text style={styles.paragraph}>
                            You agree to indemnify and hold harmless us, our
                            affiliates, officers, directors, employees, and
                            agents from and against any and all claims,
                            liabilities, damages, losses, or expenses, including
                            reasonable attorneys' fees and costs, arising out of
                            or in any way related to your use of our web
                            application, your content or information posted on
                            our web application, or your violation of these
                            Terms of Service.
                        </Text>
                        <Text style={styles.subHeading}>
                            9. Governing Law and Jurisdiction
                        </Text>
                        <Text style={styles.paragraph}>
                            These Terms of Service shall be governed by and
                            construed in accordance with the laws of the
                            jurisdiction in which we are based, without giving
                            effect to any principles of conflicts of law.
                        </Text>
                        <Text style={styles.paragraph}>
                            You agree that any action at law or in equity
                            arising out of or relating to these Terms of Service
                            shall be filed only in the courts located in the
                            jurisdiction in which we are based, and you hereby
                            consent and submit to the personal jurisdiction of
                            such courts for the purposes of litigating any such
                            action.
                        </Text>
                        <Text style={styles.subHeading}>
                            10. Changes to Terms of Service
                        </Text>
                        <Text style={styles.paragraph}>
                            We reserve the right, at our sole discretion, to
                            modify or replace these Terms of Service at any
                            time. If we make material changes to these Terms of
                            Service, we will notify you by email or by posting a
                            notice on our web application.
                        </Text>
                        <Text style={styles.paragraph}>
                            Your continued use of our web application after any
                            such changes constitutes your acceptance of the new
                            Terms of Service.
                        </Text>
                        <Text style={styles.paragraph}>
                            If you do not agree to any of these Terms of Service
                            or any future Terms of Service, do not use or access
                            (or continue to use or access) our web application.
                        </Text>
                    </VStack>
                </VStack>
                <FooterView />
            </Box>
        </ScrollView>
    );
};

export default TermsScreen;

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
