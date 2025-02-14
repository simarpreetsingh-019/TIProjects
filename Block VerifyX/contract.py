import smartpy as sp

@sp.module
def m():
        class CertificateStorage(sp.Contract):
                def __init__(self):
                        self.data.certificates = sp.cast(
                        sp.big_map(),
                        sp.big_map[
                                sp.bytes,
                                sp.record(
                                institute = sp.address,
                                user = sp.address,
                                issue_date = sp.timestamp,
                                metadata = sp.string,
                                is_expiry = sp.bool,
                                expriry_date = sp.timestamp
                                )
                        ]
                        )

                        self.data.verifications = sp.cast(
                        sp.big_map(),
                        sp.big_map[
                                sp.string,
                                sp.record(
                                verifier = sp.address,
                                institute = sp.address,
                                user = sp.address,
                                verify_date = sp.timestamp,
                                metadata = sp.string,
                                is_verified = sp.bool,
                                comment = sp.string,
                                hash = sp.bytes
                                )
                        ]
                        )

                        self.data.revoked_certificates = sp.cast(
                        sp.big_map(),
                        sp.big_map[
                                sp.bytes,
                                sp.record(
                                institute = sp.address,
                                user = sp.address
                                )
                        ]
                        )
                        

                @sp.entrypoint
                def store_certificate(self, params):
                        if not self.data.certificates.contains(params.certificate_hash):
                                self.data.certificates[params.certificate_hash] = sp.record(
                                institute = sp.sender,
                                user = params.user,
                                issue_date = sp.now,
                                metadata = params.metadata,
                                is_expiry = params.is_expiry,
                                expriry_date = params.expriry_date
                        )
                                
                        else:
                                raise ("ALREADY_EXISTS", 420)


                @sp.entrypoint
                def verify_certificate(self, params):
                # Check if the certificate hash exists
                        if not self.data.revoked_certificates.contains(params.certificate_hash):
                                if self.data.certificates.contains(params.certificate_hash):
                                        certificate_info = self.data.certificates[params.certificate_hash]
                                        # Check if the certificate was issued to the specified user
                                        self.data.verifications[params.id] = sp.record(
                                                verifier = sp.sender,
                                                institute = certificate_info.institute,
                                                user = certificate_info.user,
                                                verify_date = sp.now,
                                                metadata = certificate_info.metadata,
                                                comment = "",
                                                is_verified = False,
                                                hash = params.certificate_hash
                                        )
                                        if certificate_info.is_expiry:
                                                if sp.now > certificate_info.expriry_date:
                                                        self.data.verifications[params.id].is_verified = False
                                                        self.data.verifications[params.id].comment = "Certificate Expired"
                                                else:
                                                        if certificate_info.user == params.user:
                                                                if certificate_info.institute == params.institute:                                                            
                                                                        self.data.verifications[params.id].is_verified = True
                                                                        self.data.verifications[params.id].comment = "Verified"
                                                                else:
                                                                        self.data.verifications[params.id].is_verified = False
                                                                        self.data.verifications[params.id].comment = "Institute does not match"
                                                        else:
                                                                self.data.verifications[params.id].is_verified = False
                                                                self.data.verifications[params.id].comment = "User does not match"
                                        else:
                                                if certificate_info.user == params.user:
                                                        if certificate_info.institute == params.institute:                                                            
                                                                self.data.verifications[params.id].is_verified = True
                                                                self.data.verifications[params.id].comment = "Verified"
                                                        else:
                                                                self.data.verifications[params.id].is_verified = False
                                                                self.data.verifications[params.id].comment = "Institute does not match"
                                                else:
                                                        self.data.verifications[params.id].is_verified = False
                                                        self.data.verifications[params.id].comment = "User does not match"
                                else:
                                        self.data.verifications[params.id] = sp.record(
                                                verifier = sp.sender,
                                                verify_date = sp.now,
                                                is_verified = False,
                                                comment = "Hash Not Found",
                                                institute = sp.sender,
                                                user = sp.sender,
                                                metadata = "",
                                                hash = params.certificate_hash
                                        )
                        else:
                                self.data.verifications[params.id] = sp.record(
                                        verifier = sp.sender,
                                        verify_date = sp.now,
                                        is_verified = False,
                                        comment = "Certificate Revoked",
                                        institute = sp.sender,
                                        user = sp.sender,
                                        metadata = "",
                                        hash = params.certificate_hash
                                )

                @sp.entrypoint
                def revoke_certificate(self, params):
                        # Ensure the certificate hash doesn't already exist
                        if self.data.revoked_certificates.contains(params.certificate_hash):
                                raise ("ALREADY_EXISTS", 420)
                        else:
                        # Store the revoked certificate information
                                self.data.revoked_certificates[params.certificate_hash] = sp.record(
                                institute = sp.sender,
                                user = params.user
                                )

if "main" in __name__:
    
    @sp.add_test()
    def test():
        scenario = sp.test_scenario("CertificateVerification",m)
        
    
        # Create test accounts
        institute = sp.test_account("institute")
        user = sp.test_account("user")
        verifier = sp.test_account("verifier")
    
        # Deploy the contract
        c1 = m.CertificateStorage()
        scenario += c1

        c1.store_certificate(
                certificate_hash = sp.bytes("0x1234"),
                user = user.address,
                metadata = "bla",
                is_expiry = True,
                expriry_date = sp.timestamp(1725097600),
                _sender=institute
                )
        # c1.store_certificate(
        #         certificate_hash = sp.bytes("0x1234"),
        #         user = user.address,
        #         issue_date = sp.timestamp(1625097600),  # Example timestamp
        #         metadata = "bla",
        #         is_expiry = True,
        #         expriry_date = sp.timestamp(1725097600),
        #         _sender=institute
        #         )
        scenario.show(c1.data.certificates)
        
        c1.revoke_certificate(
                certificate_hash = sp.bytes("0x1234"),
                user = user.address,
                _sender=institute
        )
        c1.verify_certificate(
                certificate_hash = sp.bytes("0x1234"),
                user = user.address,
                id = "test",
                institute = institute.address,
                _sender=verifier
        )

        scenario.show(c1.data.verifications)






                        