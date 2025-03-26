import React from 'react'

export default function page() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 max-w-4xl">

                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">

                    Student Assessment Portal - Terms and Conditions

                </h1>



                <div className="bg-white shadow-md rounded-lg p-6 space-y-6">

                    <section>

                        <h2 className="text-xl font-semibold text-gray-700 mb-4">1. Acceptance of Terms</h2>

                        <p className="text-gray-600">

                            By accessing and using the Student Assessment Portal, you agree to be bound by these Terms and Conditions.

                            If you do not agree with these terms, please do not use the portal.

                        </p>

                    </section>



                    <section>

                        <h2 className="text-xl font-semibold text-gray-700 mb-4">2. User Eligibility</h2>

                        <p className="text-gray-600">

                            This portal is exclusively for registered students and authorized educational personnel.

                            Users must maintain the confidentiality of their login credentials and are responsible for all activities

                            conducted under their account.

                        </p>

                    </section>



                    <section>

                        <h2 className="text-xl font-semibold text-gray-700 mb-4">3. Data Privacy and Security</h2>

                        <ul className="list-disc list-inside text-gray-600 space-y-2">

                            <li>Personal and academic information is strictly confidential.</li>

                            <li>Users must not share or misuse other users' information.</li>

                            <li>The portal employs industry-standard security measures to protect user data.</li>

                        </ul>

                    </section>



                    <section>

                        <h2 className="text-xl font-semibold text-gray-700 mb-4">4. Non-Refundable Policies</h2>

                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">

                            <h3 className="font-semibold text-yellow-700 mb-2">Assessment and Registration Fees</h3>

                            <ul className="list-disc list-inside text-gray-600 space-y-2">

                                <li>All assessment and registration fees are non-refundable.</li>

                                <li>Fees paid cannot be transferred or credited to future assessments.</li>

                                <li>No refunds will be issued for missed assessments or incomplete registrations.</li>

                                <li>Payment confirms acceptance of the assessment terms.</li>

                            </ul>

                        </div>

                    </section>



                    <section>

                        <h2 className="text-xl font-semibold text-gray-700 mb-4">5. Acceptable Use</h2>

                        <p className="text-gray-600">

                            Users agree to use the portal for legitimate educational purposes only.

                            Any form of harassment, fraudulent activity, or misuse will result in immediate account suspension.

                        </p>

                    </section>



                    <section>

                        <h2 className="text-xl font-semibold text-gray-700 mb-4">6. Intellectual Property</h2>

                        <p className="text-gray-600">

                            All content on the Student Assessment Portal, including assessments,

                            materials, and design, is the intellectual property of the educational institution.

                        </p>

                    </section>



                    <section>

                        <h2 className="text-xl font-semibold text-gray-700 mb-4">7. Disclaimer</h2>

                        <p className="text-gray-600">

                            The portal is provided "as is" without any warranties. The institution reserves

                            the right to modify terms, suspend services, or terminate accounts at its discretion.

                        </p>

                    </section>



                    <div className="text-center mt-6">

                        <p className="text-sm text-gray-500">

                            By continuing to use this portal, you acknowledge that you have read,

                            understood, and agree to these Terms and Conditions.

                        </p>

                    </div>

                </div>

            </div>
        </>
    )
}
