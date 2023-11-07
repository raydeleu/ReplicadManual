// convert step file to base 64
// openssl base64 -A -in <infile> -out <outfile>
// -A is needed to have a single large string without new lines

let {importSTEP} = replicad  

async function main()  
{  

let stepFile = "SVNPLTEwMzAzLTIxOwpIRUFERVI7CkZJTEVfREVTQ1JJUFRJT04oKCdPcGVuIENBU0NBREUgTW9kZWwnKSwnMjsxJyk7CkZJTEVfTkFNRSgnT3BlbiBDQVNDQURFIFNoYXBlIE1vZGVsJywnMjAyMy0xMS0wN1QyMzo1MDoyMycsKCdBdXRob3InKSwoCiAgICAnT3BlbiBDQVNDQURFJyksJ09wZW4gQ0FTQ0FERSBTVEVQIHByb2Nlc3NvciA3LjYnLCdPcGVuIENBU0NBREUgNy42JwogICwnVW5rbm93bicpOwpGSUxFX1NDSEVNQSgoCidBUDI0Ml9NQU5BR0VEX01PREVMX0JBU0VEXzNEX0VOR0lORUVSSU5HX01JTV9MRi4gezEgMCAxMDMwMyA0NDIgMSAxIDQgCn0nKSk7CkVORFNFQzsKREFUQTsKIzEgPSBBUFBMSUNBVElPTl9QUk9UT0NPTF9ERUZJTklUSU9OKCdpbnRlcm5hdGlvbmFsIHN0YW5kYXJkJywKICAnYXAyNDJfbWFuYWdlZF9tb2RlbF9iYXNlZF8zZF9lbmdpbmVlcmluZycsMjAxMywjMik7CiMyID0gQVBQTElDQVRJT05fQ09OVEVYVCgnTWFuYWdlZCBtb2RlbCBiYXNlZCAzZCBlbmdpbmVlcmluZycpOwojMyA9IFNIQVBFX0RFRklOSVRJT05fUkVQUkVTRU5UQVRJT04oIzQsIzEwKTsKIzQgPSBQUk9EVUNUX0RFRklOSVRJT05fU0hBUEUoJycsJycsIzUpOwojNSA9IFBST0RVQ1RfREVGSU5JVElPTignZGVzaWduJywnJywjNiwjOSk7CiM2ID0gUFJPRFVDVF9ERUZJTklUSU9OX0ZPUk1BVElPTignJywnJywjNyk7CiM3ID0gUFJPRFVDVCgnT3BlbiBDQVNDQURFIFNURVAgdHJhbnNsYXRvciA3LjYgMicsCiAgJ09wZW4gQ0FTQ0FERSBTVEVQIHRyYW5zbGF0b3IgNy42IDInLCcnLCgjOCkpOwojOCA9IFBST0RVQ1RfQ09OVEVYVCgnJywjMiwnbWVjaGFuaWNhbCcpOwojOSA9IFBST0RVQ1RfREVGSU5JVElPTl9DT05URVhUKCdwYXJ0IGRlZmluaXRpb24nLCMyLCdkZXNpZ24nKTsKIzEwID0gQURWQU5DRURfQlJFUF9TSEFQRV9SRVBSRVNFTlRBVElPTignJywoIzExLCMxNSksIzQzNyk7CiMxMSA9IEFYSVMyX1BMQUNFTUVOVF8zRCgnJywjMTIsIzEzLCMxNCk7CiMxMiA9IENBUlRFU0lBTl9QT0lOVCgnJywoMC4sMC4sMC4pKTsKIzEzID0gRElSRUNUSU9OKCcnLCgwLiwwLiwxLikpOwojMTQgPSBESVJFQ1RJT04oJycsKDEuLDAuLC0wLikpOwojMTUgPSBNQU5JRk9MRF9TT0xJRF9CUkVQKCcnLCMxNik7CiMxNiA9IENMT1NFRF9TSEVMTCgnJywoIzE3LCMxMzcsIzIxNiwjMjk5LCMzNzQsIzQyMSwjNDI5KSk7CiMxNyA9IEFEVkFOQ0VEX0ZBQ0UoJycsKCMxOCksIzMyLC5GLik7CiMxOCA9IEZBQ0VfQk9VTkQoJycsIzE5LC5GLik7CiMxOSA9IEVER0VfTE9PUCgnJywoIzIwLCM1NSwjODMsIzExMSkpOwojMjAgPSBPUklFTlRFRF9FREdFKCcnLCosKiwjMjEsLlQuKTsKIzIxID0gRURHRV9DVVJWRSgnJywjMjIsIzI0LCMyNiwuVC4pOwojMjIgPSBWRVJURVhfUE9JTlQoJycsIzIzKTsKIzIzID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgwLiwwLiwwLikpOwojMjQgPSBWRVJURVhfUE9JTlQoJycsIzI1KTsKIzI1ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgwLiwwLiwyMC4pKTsKIzI2ID0gU1VSRkFDRV9DVVJWRSgnJywjMjcsKCMzMSwjNDMpLC5QQ1VSVkVfUzEuKTsKIzI3ID0gTElORSgnJywjMjgsIzI5KTsKIzI4ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgwLiwwLiwwLikpOwojMjkgPSBWRUNUT1IoJycsIzMwLDEuKTsKIzMwID0gRElSRUNUSU9OKCcnLCgwLiwwLiwxLikpOwojMzEgPSBQQ1VSVkUoJycsIzMyLCMzNyk7CiMzMiA9IFBMQU5FKCcnLCMzMyk7CiMzMyA9IEFYSVMyX1BMQUNFTUVOVF8zRCgnJywjMzQsIzM1LCMzNik7CiMzNCA9IENBUlRFU0lBTl9QT0lOVCgnJywoMC4sMC4sMC4pKTsKIzM1ID0gRElSRUNUSU9OKCcnLCgwLiwxLiwwLikpOwojMzYgPSBESVJFQ1RJT04oJycsKDEuLDAuLDAuKSk7CiMzNyA9IERFRklOSVRJT05BTF9SRVBSRVNFTlRBVElPTignJywoIzM4KSwjNDIpOwojMzggPSBMSU5FKCcnLCMzOSwjNDApOwojMzkgPSBDQVJURVNJQU5fUE9JTlQoJycsKDAuLDAuKSk7CiM0MCA9IFZFQ1RPUignJywjNDEsMS4pOwojNDEgPSBESVJFQ1RJT04oJycsKDAuLC0xLikpOwojNDIgPSAoIEdFT01FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKDIpIApQQVJBTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoKSBSRVBSRVNFTlRBVElPTl9DT05URVhUKCcyRCBTUEFDRScsJycKICApICk7CiM0MyA9IFBDVVJWRSgnJywjNDQsIzQ5KTsKIzQ0ID0gUExBTkUoJycsIzQ1KTsKIzQ1ID0gQVhJUzJfUExBQ0VNRU5UXzNEKCcnLCM0NiwjNDcsIzQ4KTsKIzQ2ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgwLiw0MC4sMC4pKTsKIzQ3ID0gRElSRUNUSU9OKCcnLCgxLiwwLiwtMC4pKTsKIzQ4ID0gRElSRUNUSU9OKCcnLCgwLiwtMS4sMC4pKTsKIzQ5ID0gREVGSU5JVElPTkFMX1JFUFJFU0VOVEFUSU9OKCcnLCgjNTApLCM1NCk7CiM1MCA9IExJTkUoJycsIzUxLCM1Mik7CiM1MSA9IENBUlRFU0lBTl9QT0lOVCgnJywoNDAuLDAuKSk7CiM1MiA9IFZFQ1RPUignJywjNTMsMS4pOwojNTMgPSBESVJFQ1RJT04oJycsKDAuLC0xLikpOwojNTQgPSAoIEdFT01FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKDIpIApQQVJBTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoKSBSRVBSRVNFTlRBVElPTl9DT05URVhUKCcyRCBTUEFDRScsJycKICApICk7CiM1NSA9IE9SSUVOVEVEX0VER0UoJycsKiwqLCM1NiwuVC4pOwojNTYgPSBFREdFX0NVUlZFKCcnLCMyNCwjNTcsIzU5LC5ULik7CiM1NyA9IFZFUlRFWF9QT0lOVCgnJywjNTgpOwojNTggPSBDQVJURVNJQU5fUE9JTlQoJycsKDEwMC4sMC4sMjAuKSk7CiM1OSA9IFNVUkZBQ0VfQ1VSVkUoJycsIzYwLCgjNjQsIzcxKSwuUENVUlZFX1MxLik7CiM2MCA9IExJTkUoJycsIzYxLCM2Mik7CiM2MSA9IENBUlRFU0lBTl9QT0lOVCgnJywoMC4sMC4sMjAuKSk7CiM2MiA9IFZFQ1RPUignJywjNjMsMS4pOwojNjMgPSBESVJFQ1RJT04oJycsKDEuLDAuLDAuKSk7CiM2NCA9IFBDVVJWRSgnJywjMzIsIzY1KTsKIzY1ID0gREVGSU5JVElPTkFMX1JFUFJFU0VOVEFUSU9OKCcnLCgjNjYpLCM3MCk7CiM2NiA9IExJTkUoJycsIzY3LCM2OCk7CiM2NyA9IENBUlRFU0lBTl9QT0lOVCgnJywoMC4sLTIwLikpOwojNjggPSBWRUNUT1IoJycsIzY5LDEuKTsKIzY5ID0gRElSRUNUSU9OKCcnLCgxLiwwLikpOwojNzAgPSAoIEdFT01FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKDIpIApQQVJBTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoKSBSRVBSRVNFTlRBVElPTl9DT05URVhUKCcyRCBTUEFDRScsJycKICApICk7CiM3MSA9IFBDVVJWRSgnJywjNzIsIzc3KTsKIzcyID0gUExBTkUoJycsIzczKTsKIzczID0gQVhJUzJfUExBQ0VNRU5UXzNEKCcnLCM3NCwjNzUsIzc2KTsKIzc0ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCg0OS44NDM4NjA5MjExMTksMjUuODE3NTgzMzU5MjYyLDIwLikpOwojNzUgPSBESVJFQ1RJT04oJycsKDAuLDAuLDEuKSk7CiM3NiA9IERJUkVDVElPTignJywoMS4sMC4sLTAuKSk7CiM3NyA9IERFRklOSVRJT05BTF9SRVBSRVNFTlRBVElPTignJywoIzc4KSwjODIpOwojNzggPSBMSU5FKCcnLCM3OSwjODApOwojNzkgPSBDQVJURVNJQU5fUE9JTlQoJycsKC00OS44NDM4NjA5MjExMSwtMjUuODE3NTgzMzU5MjYpKTsKIzgwID0gVkVDVE9SKCcnLCM4MSwxLik7CiM4MSA9IERJUkVDVElPTignJywoMS4sMC4pKTsKIzgyID0gKCBHRU9NRVRSSUNfUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgyKSAKUEFSQU1FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKCkgUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgnMkQgU1BBQ0UnLCcnCiAgKSApOwojODMgPSBPUklFTlRFRF9FREdFKCcnLCosKiwjODQsLkYuKTsKIzg0ID0gRURHRV9DVVJWRSgnJywjODUsIzU3LCM4NywuVC4pOwojODUgPSBWRVJURVhfUE9JTlQoJycsIzg2KTsKIzg2ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgxMDAuLDAuLDAuKSk7CiM4NyA9IFNVUkZBQ0VfQ1VSVkUoJycsIzg4LCgjOTIsIzk5KSwuUENVUlZFX1MxLik7CiM4OCA9IExJTkUoJycsIzg5LCM5MCk7CiM4OSA9IENBUlRFU0lBTl9QT0lOVCgnJywoMTAwLiwwLiwwLikpOwojOTAgPSBWRUNUT1IoJycsIzkxLDEuKTsKIzkxID0gRElSRUNUSU9OKCcnLCgwLiwwLiwxLikpOwojOTIgPSBQQ1VSVkUoJycsIzMyLCM5Myk7CiM5MyA9IERFRklOSVRJT05BTF9SRVBSRVNFTlRBVElPTignJywoIzk0KSwjOTgpOwojOTQgPSBMSU5FKCcnLCM5NSwjOTYpOwojOTUgPSBDQVJURVNJQU5fUE9JTlQoJycsKDEwMC4sMC4pKTsKIzk2ID0gVkVDVE9SKCcnLCM5NywxLik7CiM5NyA9IERJUkVDVElPTignJywoMC4sLTEuKSk7CiM5OCA9ICggR0VPTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoMikgClBBUkFNRVRSSUNfUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgpIFJFUFJFU0VOVEFUSU9OX0NPTlRFWFQoJzJEIFNQQUNFJywnJwogICkgKTsKIzk5ID0gUENVUlZFKCcnLCMxMDAsIzEwNSk7CiMxMDAgPSBQTEFORSgnJywjMTAxKTsKIzEwMSA9IEFYSVMyX1BMQUNFTUVOVF8zRCgnJywjMTAyLCMxMDMsIzEwNCk7CiMxMDIgPSBDQVJURVNJQU5fUE9JTlQoJycsKDEwMC4sMC4sMC4pKTsKIzEwMyA9IERJUkVDVElPTignJywoLTEuLDAuLDAuKSk7CiMxMDQgPSBESVJFQ1RJT04oJycsKDAuLDEuLDAuKSk7CiMxMDUgPSBERUZJTklUSU9OQUxfUkVQUkVTRU5UQVRJT04oJycsKCMxMDYpLCMxMTApOwojMTA2ID0gTElORSgnJywjMTA3LCMxMDgpOwojMTA3ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgwLiwwLikpOwojMTA4ID0gVkVDVE9SKCcnLCMxMDksMS4pOwojMTA5ID0gRElSRUNUSU9OKCcnLCgwLiwtMS4pKTsKIzExMCA9ICggR0VPTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoMikgClBBUkFNRVRSSUNfUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgpIFJFUFJFU0VOVEFUSU9OX0NPTlRFWFQoJzJEIFNQQUNFJywnJwogICkgKTsKIzExMSA9IE9SSUVOVEVEX0VER0UoJycsKiwqLCMxMTIsLkYuKTsKIzExMiA9IEVER0VfQ1VSVkUoJycsIzIyLCM4NSwjMTEzLC5ULik7CiMxMTMgPSBTVVJGQUNFX0NVUlZFKCcnLCMxMTQsKCMxMTgsIzEyNSksLlBDVVJWRV9TMS4pOwojMTE0ID0gTElORSgnJywjMTE1LCMxMTYpOwojMTE1ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgwLiwwLiwwLikpOwojMTE2ID0gVkVDVE9SKCcnLCMxMTcsMS4pOwojMTE3ID0gRElSRUNUSU9OKCcnLCgxLiwwLiwwLikpOwojMTE4ID0gUENVUlZFKCcnLCMzMiwjMTE5KTsKIzExOSA9IERFRklOSVRJT05BTF9SRVBSRVNFTlRBVElPTignJywoIzEyMCksIzEyNCk7CiMxMjAgPSBMSU5FKCcnLCMxMjEsIzEyMik7CiMxMjEgPSBDQVJURVNJQU5fUE9JTlQoJycsKDAuLDAuKSk7CiMxMjIgPSBWRUNUT1IoJycsIzEyMywxLik7CiMxMjMgPSBESVJFQ1RJT04oJycsKDEuLDAuKSk7CiMxMjQgPSAoIEdFT01FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKDIpIApQQVJBTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoKSBSRVBSRVNFTlRBVElPTl9DT05URVhUKCcyRCBTUEFDRScsJycKICApICk7CiMxMjUgPSBQQ1VSVkUoJycsIzEyNiwjMTMxKTsKIzEyNiA9IFBMQU5FKCcnLCMxMjcpOwojMTI3ID0gQVhJUzJfUExBQ0VNRU5UXzNEKCcnLCMxMjgsIzEyOSwjMTMwKTsKIzEyOCA9IENBUlRFU0lBTl9QT0lOVCgnJywoNDkuODQzODYwOTIxMTE5LDI1LjgxNzU4MzM1OTI2MiwwLikpOwojMTI5ID0gRElSRUNUSU9OKCcnLCgwLiwwLiwxLikpOwojMTMwID0gRElSRUNUSU9OKCcnLCgxLiwwLiwtMC4pKTsKIzEzMSA9IERFRklOSVRJT05BTF9SRVBSRVNFTlRBVElPTignJywoIzEzMiksIzEzNik7CiMxMzIgPSBMSU5FKCcnLCMxMzMsIzEzNCk7CiMxMzMgPSBDQVJURVNJQU5fUE9JTlQoJycsKC00OS44NDM4NjA5MjExMSwtMjUuODE3NTgzMzU5MjYpKTsKIzEzNCA9IFZFQ1RPUignJywjMTM1LDEuKTsKIzEzNSA9IERJUkVDVElPTignJywoMS4sMC4pKTsKIzEzNiA9ICggR0VPTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoMikgClBBUkFNRVRSSUNfUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgpIFJFUFJFU0VOVEFUSU9OX0NPTlRFWFQoJzJEIFNQQUNFJywnJwogICkgKTsKIzEzNyA9IEFEVkFOQ0VEX0ZBQ0UoJycsKCMxMzgpLCMxMDAsLkYuKTsKIzEzOCA9IEZBQ0VfQk9VTkQoJycsIzEzOSwuRi4pOwojMTM5ID0gRURHRV9MT09QKCcnLCgjMTQwLCMxNDEsIzE2NCwjMTk1KSk7CiMxNDAgPSBPUklFTlRFRF9FREdFKCcnLCosKiwjODQsLlQuKTsKIzE0MSA9IE9SSUVOVEVEX0VER0UoJycsKiwqLCMxNDIsLlQuKTsKIzE0MiA9IEVER0VfQ1VSVkUoJycsIzU3LCMxNDMsIzE0NSwuVC4pOwojMTQzID0gVkVSVEVYX1BPSU5UKCcnLCMxNDQpOwojMTQ0ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgxMDAuLDQwLiwyMC4pKTsKIzE0NSA9IFNVUkZBQ0VfQ1VSVkUoJycsIzE0NiwoIzE1MCwjMTU3KSwuUENVUlZFX1MxLik7CiMxNDYgPSBMSU5FKCcnLCMxNDcsIzE0OCk7CiMxNDcgPSBDQVJURVNJQU5fUE9JTlQoJycsKDEwMC4sMC4sMjAuKSk7CiMxNDggPSBWRUNUT1IoJycsIzE0OSwxLik7CiMxNDkgPSBESVJFQ1RJT04oJycsKDAuLDEuLDAuKSk7CiMxNTAgPSBQQ1VSVkUoJycsIzEwMCwjMTUxKTsKIzE1MSA9IERFRklOSVRJT05BTF9SRVBSRVNFTlRBVElPTignJywoIzE1MiksIzE1Nik7CiMxNTIgPSBMSU5FKCcnLCMxNTMsIzE1NCk7CiMxNTMgPSBDQVJURVNJQU5fUE9JTlQoJycsKDAuLC0yMC4pKTsKIzE1NCA9IFZFQ1RPUignJywjMTU1LDEuKTsKIzE1NSA9IERJUkVDVElPTignJywoMS4sMC4pKTsKIzE1NiA9ICggR0VPTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoMikgClBBUkFNRVRSSUNfUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgpIFJFUFJFU0VOVEFUSU9OX0NPTlRFWFQoJzJEIFNQQUNFJywnJwogICkgKTsKIzE1NyA9IFBDVVJWRSgnJywjNzIsIzE1OCk7CiMxNTggPSBERUZJTklUSU9OQUxfUkVQUkVTRU5UQVRJT04oJycsKCMxNTkpLCMxNjMpOwojMTU5ID0gTElORSgnJywjMTYwLCMxNjEpOwojMTYwID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCg1MC4xNTYxMzkwNzg4ODEsLTI1LjgxNzU4MzM1OTI2KSk7CiMxNjEgPSBWRUNUT1IoJycsIzE2MiwxLik7CiMxNjIgPSBESVJFQ1RJT04oJycsKDAuLDEuKSk7CiMxNjMgPSAoIEdFT01FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKDIpIApQQVJBTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoKSBSRVBSRVNFTlRBVElPTl9DT05URVhUKCcyRCBTUEFDRScsJycKICApICk7CiMxNjQgPSBPUklFTlRFRF9FREdFKCcnLCosKiwjMTY1LC5GLik7CiMxNjUgPSBFREdFX0NVUlZFKCcnLCMxNjYsIzE0MywjMTY4LC5ULik7CiMxNjYgPSBWRVJURVhfUE9JTlQoJycsIzE2Nyk7CiMxNjcgPSBDQVJURVNJQU5fUE9JTlQoJycsKDEwMC4sNDAuLDAuKSk7CiMxNjggPSBTVVJGQUNFX0NVUlZFKCcnLCMxNjksKCMxNzMsIzE4MCksLlBDVVJWRV9TMS4pOwojMTY5ID0gTElORSgnJywjMTcwLCMxNzEpOwojMTcwID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgxMDAuLDQwLiwwLikpOwojMTcxID0gVkVDVE9SKCcnLCMxNzIsMS4pOwojMTcyID0gRElSRUNUSU9OKCcnLCgwLiwwLiwxLikpOwojMTczID0gUENVUlZFKCcnLCMxMDAsIzE3NCk7CiMxNzQgPSBERUZJTklUSU9OQUxfUkVQUkVTRU5UQVRJT04oJycsKCMxNzUpLCMxNzkpOwojMTc1ID0gTElORSgnJywjMTc2LCMxNzcpOwojMTc2ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCg0MC4sMC4pKTsKIzE3NyA9IFZFQ1RPUignJywjMTc4LDEuKTsKIzE3OCA9IERJUkVDVElPTignJywoMC4sLTEuKSk7CiMxNzkgPSAoIEdFT01FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKDIpIApQQVJBTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoKSBSRVBSRVNFTlRBVElPTl9DT05URVhUKCcyRCBTUEFDRScsJycKICApICk7CiMxODAgPSBQQ1VSVkUoJycsIzE4MSwjMTg5KTsKIzE4MSA9IFNVUkZBQ0VfT0ZfTElORUFSX0VYVFJVU0lPTignJywjMTgyLCMxODcpOwojMTgyID0gQl9TUExJTkVfQ1VSVkVfV0lUSF9LTk9UUygnJywzLCgjMTgzLCMxODQsIzE4NSwjMTg2KSwKICAuVU5TUEVDSUZJRUQuLC5GLiwuRi4sKDQsNCksKDAuLDEuKSwuUElFQ0VXSVNFX0JFWklFUl9LTk9UUy4pOwojMTgzID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgxMDAuLDQwLiwwLikpOwojMTg0ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCg5Mi4wOTQzMDU4NDk1NzksNDcuOTA1Njk0MTUwNDIxLDAuKSk7CiMxODUgPSBDQVJURVNJQU5fUE9JTlQoJycsKDcxLjE4MDMzOTg4NzQ5OSw2MC4sMC4pKTsKIzE4NiA9IENBUlRFU0lBTl9QT0lOVCgnJywoNjAuLDYwLiwwLikpOwojMTg3ID0gVkVDVE9SKCcnLCMxODgsMS4pOwojMTg4ID0gRElSRUNUSU9OKCcnLCgtMC4sLTAuLC0xLikpOwojMTg5ID0gREVGSU5JVElPTkFMX1JFUFJFU0VOVEFUSU9OKCcnLCgjMTkwKSwjMTk0KTsKIzE5MCA9IExJTkUoJycsIzE5MSwjMTkyKTsKIzE5MSA9IENBUlRFU0lBTl9QT0lOVCgnJywoMC4sMC4pKTsKIzE5MiA9IFZFQ1RPUignJywjMTkzLDEuKTsKIzE5MyA9IERJUkVDVElPTignJywoMC4sLTEuKSk7CiMxOTQgPSAoIEdFT01FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKDIpIApQQVJBTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoKSBSRVBSRVNFTlRBVElPTl9DT05URVhUKCcyRCBTUEFDRScsJycKICApICk7CiMxOTUgPSBPUklFTlRFRF9FREdFKCcnLCosKiwjMTk2LC5GLik7CiMxOTYgPSBFREdFX0NVUlZFKCcnLCM4NSwjMTY2LCMxOTcsLlQuKTsKIzE5NyA9IFNVUkZBQ0VfQ1VSVkUoJycsIzE5OCwoIzIwMiwjMjA5KSwuUENVUlZFX1MxLik7CiMxOTggPSBMSU5FKCcnLCMxOTksIzIwMCk7CiMxOTkgPSBDQVJURVNJQU5fUE9JTlQoJycsKDEwMC4sMC4sMC4pKTsKIzIwMCA9IFZFQ1RPUignJywjMjAxLDEuKTsKIzIwMSA9IERJUkVDVElPTignJywoMC4sMS4sMC4pKTsKIzIwMiA9IFBDVVJWRSgnJywjMTAwLCMyMDMpOwojMjAzID0gREVGSU5JVElPTkFMX1JFUFJFU0VOVEFUSU9OKCcnLCgjMjA0KSwjMjA4KTsKIzIwNCA9IExJTkUoJycsIzIwNSwjMjA2KTsKIzIwNSA9IENBUlRFU0lBTl9QT0lOVCgnJywoMC4sMC4pKTsKIzIwNiA9IFZFQ1RPUignJywjMjA3LDEuKTsKIzIwNyA9IERJUkVDVElPTignJywoMS4sMC4pKTsKIzIwOCA9ICggR0VPTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoMikgClBBUkFNRVRSSUNfUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgpIFJFUFJFU0VOVEFUSU9OX0NPTlRFWFQoJzJEIFNQQUNFJywnJwogICkgKTsKIzIwOSA9IFBDVVJWRSgnJywjMTI2LCMyMTApOwojMjEwID0gREVGSU5JVElPTkFMX1JFUFJFU0VOVEFUSU9OKCcnLCgjMjExKSwjMjE1KTsKIzIxMSA9IExJTkUoJycsIzIxMiwjMjEzKTsKIzIxMiA9IENBUlRFU0lBTl9QT0lOVCgnJywoNTAuMTU2MTM5MDc4ODgxLC0yNS44MTc1ODMzNTkyNikpOwojMjEzID0gVkVDVE9SKCcnLCMyMTQsMS4pOwojMjE0ID0gRElSRUNUSU9OKCcnLCgwLiwxLikpOwojMjE1ID0gKCBHRU9NRVRSSUNfUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgyKSAKUEFSQU1FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKCkgUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgnMkQgU1BBQ0UnLCcnCiAgKSApOwojMjE2ID0gQURWQU5DRURfRkFDRSgnJywoIzIxNyksIzE4MSwuRi4pOwojMjE3ID0gRkFDRV9CT1VORCgnJywjMjE4LC5GLik7CiMyMTggPSBFREdFX0xPT1AoJycsKCMyMTksIzIyMCwjMjQ1LCMyNzYpKTsKIzIxOSA9IE9SSUVOVEVEX0VER0UoJycsKiwqLCMxNjUsLlQuKTsKIzIyMCA9IE9SSUVOVEVEX0VER0UoJycsKiwqLCMyMjEsLlQuKTsKIzIyMSA9IEVER0VfQ1VSVkUoJycsIzE0MywjMjIyLCMyMjQsLlQuKTsKIzIyMiA9IFZFUlRFWF9QT0lOVCgnJywjMjIzKTsKIzIyMyA9IENBUlRFU0lBTl9QT0lOVCgnJywoNjAuLDYwLiwyMC4pKTsKIzIyNCA9IFNVUkZBQ0VfQ1VSVkUoJycsIzIyNSwoIzIzMCwjMjM3KSwuUENVUlZFX1MxLik7CiMyMjUgPSBCX1NQTElORV9DVVJWRV9XSVRIX0tOT1RTKCcnLDMsKCMyMjYsIzIyNywjMjI4LCMyMjkpLAogIC5VTlNQRUNJRklFRC4sLkYuLC5GLiwoNCw0KSwoMC4sMS4pLC5QSUVDRVdJU0VfQkVaSUVSX0tOT1RTLik7CiMyMjYgPSBDQVJURVNJQU5fUE9JTlQoJycsKDEwMC4sNDAuLDIwLikpOwojMjI3ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCg5Mi4wOTQzMDU4NDk1NzksNDcuOTA1Njk0MTUwNDIxLDIwLikpOwojMjI4ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCg3MS4xODAzMzk4ODc0OTksNjAuLDIwLikpOwojMjI5ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCg2MC4sNjAuLDIwLikpOwojMjMwID0gUENVUlZFKCcnLCMxODEsIzIzMSk7CiMyMzEgPSBERUZJTklUSU9OQUxfUkVQUkVTRU5UQVRJT04oJycsKCMyMzIpLCMyMzYpOwojMjMyID0gTElORSgnJywjMjMzLCMyMzQpOwojMjMzID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgwLiwtMjAuKSk7CiMyMzQgPSBWRUNUT1IoJycsIzIzNSwxLik7CiMyMzUgPSBESVJFQ1RJT04oJycsKDEuLDAuKSk7CiMyMzYgPSAoIEdFT01FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKDIpIApQQVJBTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoKSBSRVBSRVNFTlRBVElPTl9DT05URVhUKCcyRCBTUEFDRScsJycKICApICk7CiMyMzcgPSBQQ1VSVkUoJycsIzcyLCMyMzgpOwojMjM4ID0gREVGSU5JVElPTkFMX1JFUFJFU0VOVEFUSU9OKCcnLCgjMjM5KSwjMjQ0KTsKIzIzOSA9IEJfU1BMSU5FX0NVUlZFX1dJVEhfS05PVFMoJycsMywoIzI0MCwjMjQxLCMyNDIsIzI0MyksCiAgLlVOU1BFQ0lGSUVELiwuRi4sLkYuLCg0LDQpLCgwLiwxLiksLlBJRUNFV0lTRV9CRVpJRVJfS05PVFMuKTsKIzI0MCA9IENBUlRFU0lBTl9QT0lOVCgnJywoNTAuMTU2MTM5MDc4ODgxLDE0LjE4MjQxNjY0MDczOCkpOwojMjQxID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCg0Mi4yNTA0NDQ5Mjg0NiwyMi4wODgxMTA3OTExNTkpKTsKIzI0MiA9IENBUlRFU0lBTl9QT0lOVCgnJywoMjEuMzM2NDc4OTY2MzgsMzQuMTgyNDE2NjQwNzM4KSk7CiMyNDMgPSBDQVJURVNJQU5fUE9JTlQoJycsKDEwLjE1NjEzOTA3ODg4MSwzNC4xODI0MTY2NDA3MzgpKTsKIzI0NCA9ICggR0VPTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoMikgClBBUkFNRVRSSUNfUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgpIFJFUFJFU0VOVEFUSU9OX0NPTlRFWFQoJzJEIFNQQUNFJywnJwogICkgKTsKIzI0NSA9IE9SSUVOVEVEX0VER0UoJycsKiwqLCMyNDYsLkYuKTsKIzI0NiA9IEVER0VfQ1VSVkUoJycsIzI0NywjMjIyLCMyNDksLlQuKTsKIzI0NyA9IFZFUlRFWF9QT0lOVCgnJywjMjQ4KTsKIzI0OCA9IENBUlRFU0lBTl9QT0lOVCgnJywoNjAuLDYwLiwwLikpOwojMjQ5ID0gU1VSRkFDRV9DVVJWRSgnJywjMjUwLCgjMjU0LCMyNjEpLC5QQ1VSVkVfUzEuKTsKIzI1MCA9IExJTkUoJycsIzI1MSwjMjUyKTsKIzI1MSA9IENBUlRFU0lBTl9QT0lOVCgnJywoNjAuLDYwLiwwLikpOwojMjUyID0gVkVDVE9SKCcnLCMyNTMsMS4pOwojMjUzID0gRElSRUNUSU9OKCcnLCgwLiwwLiwxLikpOwojMjU0ID0gUENVUlZFKCcnLCMxODEsIzI1NSk7CiMyNTUgPSBERUZJTklUSU9OQUxfUkVQUkVTRU5UQVRJT04oJycsKCMyNTYpLCMyNjApOwojMjU2ID0gTElORSgnJywjMjU3LCMyNTgpOwojMjU3ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgxLiwwLikpOwojMjU4ID0gVkVDVE9SKCcnLCMyNTksMS4pOwojMjU5ID0gRElSRUNUSU9OKCcnLCgwLiwtMS4pKTsKIzI2MCA9ICggR0VPTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoMikgClBBUkFNRVRSSUNfUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgpIFJFUFJFU0VOVEFUSU9OX0NPTlRFWFQoJzJEIFNQQUNFJywnJwogICkgKTsKIzI2MSA9IFBDVVJWRSgnJywjMjYyLCMyNzApOwojMjYyID0gU1VSRkFDRV9PRl9MSU5FQVJfRVhUUlVTSU9OKCcnLCMyNjMsIzI2OCk7CiMyNjMgPSBCX1NQTElORV9DVVJWRV9XSVRIX0tOT1RTKCcnLDMsKCMyNjQsIzI2NSwjMjY2LCMyNjcpLAogIC5VTlNQRUNJRklFRC4sLkYuLC5GLiwoNCw0KSwoMC4sMS4pLC5QSUVDRVdJU0VfQkVaSUVSX0tOT1RTLik7CiMyNjQgPSBDQVJURVNJQU5fUE9JTlQoJycsKDYwLiw2MC4sMC4pKTsKIzI2NSA9IENBUlRFU0lBTl9QT0lOVCgnJywoNDQuMTg4NjExNjk5MTU4LDYwLiwwLikpOwojMjY2ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgyLjkwNDUwNDkxMDkwNUUtMTUsNTUuODExMzg4MzAwODQyLDAuKSk7CiMyNjcgPSBDQVJURVNJQU5fUE9JTlQoJycsKDAuLDQwLiwwLikpOwojMjY4ID0gVkVDVE9SKCcnLCMyNjksMS4pOwojMjY5ID0gRElSRUNUSU9OKCcnLCgtMC4sLTAuLC0xLikpOwojMjcwID0gREVGSU5JVElPTkFMX1JFUFJFU0VOVEFUSU9OKCcnLCgjMjcxKSwjMjc1KTsKIzI3MSA9IExJTkUoJycsIzI3MiwjMjczKTsKIzI3MiA9IENBUlRFU0lBTl9QT0lOVCgnJywoMC4sMC4pKTsKIzI3MyA9IFZFQ1RPUignJywjMjc0LDEuKTsKIzI3NCA9IERJUkVDVElPTignJywoMC4sLTEuKSk7CiMyNzUgPSAoIEdFT01FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKDIpIApQQVJBTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoKSBSRVBSRVNFTlRBVElPTl9DT05URVhUKCcyRCBTUEFDRScsJycKICApICk7CiMyNzYgPSBPUklFTlRFRF9FREdFKCcnLCosKiwjMjc3LC5GLik7CiMyNzcgPSBFREdFX0NVUlZFKCcnLCMxNjYsIzI0NywjMjc4LC5ULik7CiMyNzggPSBTVVJGQUNFX0NVUlZFKCcnLCMyNzksKCMyODQsIzI5MSksLlBDVVJWRV9TMS4pOwojMjc5ID0gQl9TUExJTkVfQ1VSVkVfV0lUSF9LTk9UUygnJywzLCgjMjgwLCMyODEsIzI4MiwjMjgzKSwKICAuVU5TUEVDSUZJRUQuLC5GLiwuRi4sKDQsNCksKDAuLDEuKSwuUElFQ0VXSVNFX0JFWklFUl9LTk9UUy4pOwojMjgwID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgxMDAuLDQwLiwwLikpOwojMjgxID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCg5Mi4wOTQzMDU4NDk1NzksNDcuOTA1Njk0MTUwNDIxLDAuKSk7CiMyODIgPSBDQVJURVNJQU5fUE9JTlQoJycsKDcxLjE4MDMzOTg4NzQ5OSw2MC4sMC4pKTsKIzI4MyA9IENBUlRFU0lBTl9QT0lOVCgnJywoNjAuLDYwLiwwLikpOwojMjg0ID0gUENVUlZFKCcnLCMxODEsIzI4NSk7CiMyODUgPSBERUZJTklUSU9OQUxfUkVQUkVTRU5UQVRJT04oJycsKCMyODYpLCMyOTApOwojMjg2ID0gTElORSgnJywjMjg3LCMyODgpOwojMjg3ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgwLiwwLikpOwojMjg4ID0gVkVDVE9SKCcnLCMyODksMS4pOwojMjg5ID0gRElSRUNUSU9OKCcnLCgxLiwwLikpOwojMjkwID0gKCBHRU9NRVRSSUNfUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgyKSAKUEFSQU1FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKCkgUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgnMkQgU1BBQ0UnLCcnCiAgKSApOwojMjkxID0gUENVUlZFKCcnLCMxMjYsIzI5Mik7CiMyOTIgPSBERUZJTklUSU9OQUxfUkVQUkVTRU5UQVRJT04oJycsKCMyOTMpLCMyOTgpOwojMjkzID0gQl9TUExJTkVfQ1VSVkVfV0lUSF9LTk9UUygnJywzLCgjMjk0LCMyOTUsIzI5NiwjMjk3KSwKICAuVU5TUEVDSUZJRUQuLC5GLiwuRi4sKDQsNCksKDAuLDEuKSwuUElFQ0VXSVNFX0JFWklFUl9LTk9UUy4pOwojMjk0ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCg1MC4xNTYxMzkwNzg4ODEsMTQuMTgyNDE2NjQwNzM4KSk7CiMyOTUgPSBDQVJURVNJQU5fUE9JTlQoJycsKDQyLjI1MDQ0NDkyODQ2LDIyLjA4ODExMDc5MTE1OSkpOwojMjk2ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgyMS4zMzY0Nzg5NjYzOCwzNC4xODI0MTY2NDA3MzgpKTsKIzI5NyA9IENBUlRFU0lBTl9QT0lOVCgnJywoMTAuMTU2MTM5MDc4ODgxLDM0LjE4MjQxNjY0MDczOCkpOwojMjk4ID0gKCBHRU9NRVRSSUNfUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgyKSAKUEFSQU1FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKCkgUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgnMkQgU1BBQ0UnLCcnCiAgKSApOwojMjk5ID0gQURWQU5DRURfRkFDRSgnJywoIzMwMCksIzI2MiwuRi4pOwojMzAwID0gRkFDRV9CT1VORCgnJywjMzAxLC5GLik7CiMzMDEgPSBFREdFX0xPT1AoJycsKCMzMDIsIzMwMywjMzI4LCMzNTEpKTsKIzMwMiA9IE9SSUVOVEVEX0VER0UoJycsKiwqLCMyNDYsLlQuKTsKIzMwMyA9IE9SSUVOVEVEX0VER0UoJycsKiwqLCMzMDQsLlQuKTsKIzMwNCA9IEVER0VfQ1VSVkUoJycsIzIyMiwjMzA1LCMzMDcsLlQuKTsKIzMwNSA9IFZFUlRFWF9QT0lOVCgnJywjMzA2KTsKIzMwNiA9IENBUlRFU0lBTl9QT0lOVCgnJywoMC4sNDAuLDIwLikpOwojMzA3ID0gU1VSRkFDRV9DVVJWRSgnJywjMzA4LCgjMzEzLCMzMjApLC5QQ1VSVkVfUzEuKTsKIzMwOCA9IEJfU1BMSU5FX0NVUlZFX1dJVEhfS05PVFMoJycsMywoIzMwOSwjMzEwLCMzMTEsIzMxMiksCiAgLlVOU1BFQ0lGSUVELiwuRi4sLkYuLCg0LDQpLCgwLiwxLiksLlBJRUNFV0lTRV9CRVpJRVJfS05PVFMuKTsKIzMwOSA9IENBUlRFU0lBTl9QT0lOVCgnJywoNjAuLDYwLiwyMC4pKTsKIzMxMCA9IENBUlRFU0lBTl9QT0lOVCgnJywoNDQuMTg4NjExNjk5MTU4LDYwLiwyMC4pKTsKIzMxMSA9IENBUlRFU0lBTl9QT0lOVCgnJywoMi45MDQ1MDQ5MTA5MDVFLTE1LDU1LjgxMTM4ODMwMDg0MiwyMC4pKTsKIzMxMiA9IENBUlRFU0lBTl9QT0lOVCgnJywoMC4sNDAuLDIwLikpOwojMzEzID0gUENVUlZFKCcnLCMyNjIsIzMxNCk7CiMzMTQgPSBERUZJTklUSU9OQUxfUkVQUkVTRU5UQVRJT04oJycsKCMzMTUpLCMzMTkpOwojMzE1ID0gTElORSgnJywjMzE2LCMzMTcpOwojMzE2ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgwLiwtMjAuKSk7CiMzMTcgPSBWRUNUT1IoJycsIzMxOCwxLik7CiMzMTggPSBESVJFQ1RJT04oJycsKDEuLDAuKSk7CiMzMTkgPSAoIEdFT01FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKDIpIApQQVJBTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoKSBSRVBSRVNFTlRBVElPTl9DT05URVhUKCcyRCBTUEFDRScsJycKICApICk7CiMzMjAgPSBQQ1VSVkUoJycsIzcyLCMzMjEpOwojMzIxID0gREVGSU5JVElPTkFMX1JFUFJFU0VOVEFUSU9OKCcnLCgjMzIyKSwjMzI3KTsKIzMyMiA9IEJfU1BMSU5FX0NVUlZFX1dJVEhfS05PVFMoJycsMywoIzMyMywjMzI0LCMzMjUsIzMyNiksCiAgLlVOU1BFQ0lGSUVELiwuRi4sLkYuLCg0LDQpLCgwLiwxLiksLlBJRUNFV0lTRV9CRVpJRVJfS05PVFMuKTsKIzMyMyA9IENBUlRFU0lBTl9QT0lOVCgnJywoMTAuMTU2MTM5MDc4ODgxLDM0LjE4MjQxNjY0MDczOCkpOwojMzI0ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgtNS42NTUyNDkyMjE5NjEsMzQuMTgyNDE2NjQwNzM4KSk7CiMzMjUgPSBDQVJURVNJQU5fUE9JTlQoJycsKC00OS44NDM4NjA5MjExMSwyOS45OTM4MDQ5NDE1OCkpOwojMzI2ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgtNDkuODQzODYwOTIxMTEsMTQuMTgyNDE2NjQwNzM4KSk7CiMzMjcgPSAoIEdFT01FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKDIpIApQQVJBTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoKSBSRVBSRVNFTlRBVElPTl9DT05URVhUKCcyRCBTUEFDRScsJycKICApICk7CiMzMjggPSBPUklFTlRFRF9FREdFKCcnLCosKiwjMzI5LC5GLik7CiMzMjkgPSBFREdFX0NVUlZFKCcnLCMzMzAsIzMwNSwjMzMyLC5ULik7CiMzMzAgPSBWRVJURVhfUE9JTlQoJycsIzMzMSk7CiMzMzEgPSBDQVJURVNJQU5fUE9JTlQoJycsKDAuLDQwLiwwLikpOwojMzMyID0gU1VSRkFDRV9DVVJWRSgnJywjMzMzLCgjMzM3LCMzNDQpLC5QQ1VSVkVfUzEuKTsKIzMzMyA9IExJTkUoJycsIzMzNCwjMzM1KTsKIzMzNCA9IENBUlRFU0lBTl9QT0lOVCgnJywoMC4sNDAuLDAuKSk7CiMzMzUgPSBWRUNUT1IoJycsIzMzNiwxLik7CiMzMzYgPSBESVJFQ1RJT04oJycsKDAuLDAuLDEuKSk7CiMzMzcgPSBQQ1VSVkUoJycsIzI2MiwjMzM4KTsKIzMzOCA9IERFRklOSVRJT05BTF9SRVBSRVNFTlRBVElPTignJywoIzMzOSksIzM0Myk7CiMzMzkgPSBMSU5FKCcnLCMzNDAsIzM0MSk7CiMzNDAgPSBDQVJURVNJQU5fUE9JTlQoJycsKDEuLDAuKSk7CiMzNDEgPSBWRUNUT1IoJycsIzM0MiwxLik7CiMzNDIgPSBESVJFQ1RJT04oJycsKDAuLC0xLikpOwojMzQzID0gKCBHRU9NRVRSSUNfUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgyKSAKUEFSQU1FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKCkgUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgnMkQgU1BBQ0UnLCcnCiAgKSApOwojMzQ0ID0gUENVUlZFKCcnLCM0NCwjMzQ1KTsKIzM0NSA9IERFRklOSVRJT05BTF9SRVBSRVNFTlRBVElPTignJywoIzM0NiksIzM1MCk7CiMzNDYgPSBMSU5FKCcnLCMzNDcsIzM0OCk7CiMzNDcgPSBDQVJURVNJQU5fUE9JTlQoJycsKDAuLDAuKSk7CiMzNDggPSBWRUNUT1IoJycsIzM0OSwxLik7CiMzNDkgPSBESVJFQ1RJT04oJycsKDAuLC0xLikpOwojMzUwID0gKCBHRU9NRVRSSUNfUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgyKSAKUEFSQU1FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKCkgUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgnMkQgU1BBQ0UnLCcnCiAgKSApOwojMzUxID0gT1JJRU5URURfRURHRSgnJywqLCosIzM1MiwuRi4pOwojMzUyID0gRURHRV9DVVJWRSgnJywjMjQ3LCMzMzAsIzM1MywuVC4pOwojMzUzID0gU1VSRkFDRV9DVVJWRSgnJywjMzU0LCgjMzU5LCMzNjYpLC5QQ1VSVkVfUzEuKTsKIzM1NCA9IEJfU1BMSU5FX0NVUlZFX1dJVEhfS05PVFMoJycsMywoIzM1NSwjMzU2LCMzNTcsIzM1OCksCiAgLlVOU1BFQ0lGSUVELiwuRi4sLkYuLCg0LDQpLCgwLiwxLiksLlBJRUNFV0lTRV9CRVpJRVJfS05PVFMuKTsKIzM1NSA9IENBUlRFU0lBTl9QT0lOVCgnJywoNjAuLDYwLiwwLikpOwojMzU2ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCg0NC4xODg2MTE2OTkxNTgsNjAuLDAuKSk7CiMzNTcgPSBDQVJURVNJQU5fUE9JTlQoJycsKDIuOTA0NTA0OTEwOTA1RS0xNSw1NS44MTEzODgzMDA4NDIsMC4pKTsKIzM1OCA9IENBUlRFU0lBTl9QT0lOVCgnJywoMC4sNDAuLDAuKSk7CiMzNTkgPSBQQ1VSVkUoJycsIzI2MiwjMzYwKTsKIzM2MCA9IERFRklOSVRJT05BTF9SRVBSRVNFTlRBVElPTignJywoIzM2MSksIzM2NSk7CiMzNjEgPSBMSU5FKCcnLCMzNjIsIzM2Myk7CiMzNjIgPSBDQVJURVNJQU5fUE9JTlQoJycsKDAuLDAuKSk7CiMzNjMgPSBWRUNUT1IoJycsIzM2NCwxLik7CiMzNjQgPSBESVJFQ1RJT04oJycsKDEuLDAuKSk7CiMzNjUgPSAoIEdFT01FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKDIpIApQQVJBTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoKSBSRVBSRVNFTlRBVElPTl9DT05URVhUKCcyRCBTUEFDRScsJycKICApICk7CiMzNjYgPSBQQ1VSVkUoJycsIzEyNiwjMzY3KTsKIzM2NyA9IERFRklOSVRJT05BTF9SRVBSRVNFTlRBVElPTignJywoIzM2OCksIzM3Myk7CiMzNjggPSBCX1NQTElORV9DVVJWRV9XSVRIX0tOT1RTKCcnLDMsKCMzNjksIzM3MCwjMzcxLCMzNzIpLAogIC5VTlNQRUNJRklFRC4sLkYuLC5GLiwoNCw0KSwoMC4sMS4pLC5QSUVDRVdJU0VfQkVaSUVSX0tOT1RTLik7CiMzNjkgPSBDQVJURVNJQU5fUE9JTlQoJycsKDEwLjE1NjEzOTA3ODg4MSwzNC4xODI0MTY2NDA3MzgpKTsKIzM3MCA9IENBUlRFU0lBTl9QT0lOVCgnJywoLTUuNjU1MjQ5MjIxOTYxLDM0LjE4MjQxNjY0MDczOCkpOwojMzcxID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgtNDkuODQzODYwOTIxMTEsMjkuOTkzODA0OTQxNTgpKTsKIzM3MiA9IENBUlRFU0lBTl9QT0lOVCgnJywoLTQ5Ljg0Mzg2MDkyMTExLDE0LjE4MjQxNjY0MDczOCkpOwojMzczID0gKCBHRU9NRVRSSUNfUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgyKSAKUEFSQU1FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKCkgUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgnMkQgU1BBQ0UnLCcnCiAgKSApOwojMzc0ID0gQURWQU5DRURfRkFDRSgnJywoIzM3NSksIzQ0LC5GLik7CiMzNzUgPSBGQUNFX0JPVU5EKCcnLCMzNzYsLkYuKTsKIzM3NiA9IEVER0VfTE9PUCgnJywoIzM3NywjMzc4LCMzOTksIzQwMCkpOwojMzc3ID0gT1JJRU5URURfRURHRSgnJywqLCosIzMyOSwuVC4pOwojMzc4ID0gT1JJRU5URURfRURHRSgnJywqLCosIzM3OSwuVC4pOwojMzc5ID0gRURHRV9DVVJWRSgnJywjMzA1LCMyNCwjMzgwLC5ULik7CiMzODAgPSBTVVJGQUNFX0NVUlZFKCcnLCMzODEsKCMzODUsIzM5MiksLlBDVVJWRV9TMS4pOwojMzgxID0gTElORSgnJywjMzgyLCMzODMpOwojMzgyID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgwLiw0MC4sMjAuKSk7CiMzODMgPSBWRUNUT1IoJycsIzM4NCwxLik7CiMzODQgPSBESVJFQ1RJT04oJycsKDAuLC0xLiwtMC4pKTsKIzM4NSA9IFBDVVJWRSgnJywjNDQsIzM4Nik7CiMzODYgPSBERUZJTklUSU9OQUxfUkVQUkVTRU5UQVRJT04oJycsKCMzODcpLCMzOTEpOwojMzg3ID0gTElORSgnJywjMzg4LCMzODkpOwojMzg4ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgwLiwtMjAuKSk7CiMzODkgPSBWRUNUT1IoJycsIzM5MCwxLik7CiMzOTAgPSBESVJFQ1RJT04oJycsKDEuLDAuKSk7CiMzOTEgPSAoIEdFT01FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKDIpIApQQVJBTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoKSBSRVBSRVNFTlRBVElPTl9DT05URVhUKCcyRCBTUEFDRScsJycKICApICk7CiMzOTIgPSBQQ1VSVkUoJycsIzcyLCMzOTMpOwojMzkzID0gREVGSU5JVElPTkFMX1JFUFJFU0VOVEFUSU9OKCcnLCgjMzk0KSwjMzk4KTsKIzM5NCA9IExJTkUoJycsIzM5NSwjMzk2KTsKIzM5NSA9IENBUlRFU0lBTl9QT0lOVCgnJywoLTQ5Ljg0Mzg2MDkyMTExLDE0LjE4MjQxNjY0MDczOCkpOwojMzk2ID0gVkVDVE9SKCcnLCMzOTcsMS4pOwojMzk3ID0gRElSRUNUSU9OKCcnLCgwLiwtMS4pKTsKIzM5OCA9ICggR0VPTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoMikgClBBUkFNRVRSSUNfUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgpIFJFUFJFU0VOVEFUSU9OX0NPTlRFWFQoJzJEIFNQQUNFJywnJwogICkgKTsKIzM5OSA9IE9SSUVOVEVEX0VER0UoJycsKiwqLCMyMSwuRi4pOwojNDAwID0gT1JJRU5URURfRURHRSgnJywqLCosIzQwMSwuRi4pOwojNDAxID0gRURHRV9DVVJWRSgnJywjMzMwLCMyMiwjNDAyLC5ULik7CiM0MDIgPSBTVVJGQUNFX0NVUlZFKCcnLCM0MDMsKCM0MDcsIzQxNCksLlBDVVJWRV9TMS4pOwojNDAzID0gTElORSgnJywjNDA0LCM0MDUpOwojNDA0ID0gQ0FSVEVTSUFOX1BPSU5UKCcnLCgwLiw0MC4sMC4pKTsKIzQwNSA9IFZFQ1RPUignJywjNDA2LDEuKTsKIzQwNiA9IERJUkVDVElPTignJywoMC4sLTEuLC0wLikpOwojNDA3ID0gUENVUlZFKCcnLCM0NCwjNDA4KTsKIzQwOCA9IERFRklOSVRJT05BTF9SRVBSRVNFTlRBVElPTignJywoIzQwOSksIzQxMyk7CiM0MDkgPSBMSU5FKCcnLCM0MTAsIzQxMSk7CiM0MTAgPSBDQVJURVNJQU5fUE9JTlQoJycsKDAuLDAuKSk7CiM0MTEgPSBWRUNUT1IoJycsIzQxMiwxLik7CiM0MTIgPSBESVJFQ1RJT04oJycsKDEuLDAuKSk7CiM0MTMgPSAoIEdFT01FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKDIpIApQQVJBTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoKSBSRVBSRVNFTlRBVElPTl9DT05URVhUKCcyRCBTUEFDRScsJycKICApICk7CiM0MTQgPSBQQ1VSVkUoJycsIzEyNiwjNDE1KTsKIzQxNSA9IERFRklOSVRJT05BTF9SRVBSRVNFTlRBVElPTignJywoIzQxNiksIzQyMCk7CiM0MTYgPSBMSU5FKCcnLCM0MTcsIzQxOCk7CiM0MTcgPSBDQVJURVNJQU5fUE9JTlQoJycsKC00OS44NDM4NjA5MjExMSwxNC4xODI0MTY2NDA3MzgpKTsKIzQxOCA9IFZFQ1RPUignJywjNDE5LDEuKTsKIzQxOSA9IERJUkVDVElPTignJywoMC4sLTEuKSk7CiM0MjAgPSAoIEdFT01FVFJJQ19SRVBSRVNFTlRBVElPTl9DT05URVhUKDIpIApQQVJBTUVUUklDX1JFUFJFU0VOVEFUSU9OX0NPTlRFWFQoKSBSRVBSRVNFTlRBVElPTl9DT05URVhUKCcyRCBTUEFDRScsJycKICApICk7CiM0MjEgPSBBRFZBTkNFRF9GQUNFKCcnLCgjNDIyKSwjMTI2LC5GLik7CiM0MjIgPSBGQUNFX0JPVU5EKCcnLCM0MjMsLkYuKTsKIzQyMyA9IEVER0VfTE9PUCgnJywoIzQyNCwjNDI1LCM0MjYsIzQyNywjNDI4KSk7CiM0MjQgPSBPUklFTlRFRF9FREdFKCcnLCosKiwjMTEyLC5ULik7CiM0MjUgPSBPUklFTlRFRF9FREdFKCcnLCosKiwjMTk2LC5ULik7CiM0MjYgPSBPUklFTlRFRF9FREdFKCcnLCosKiwjMjc3LC5ULik7CiM0MjcgPSBPUklFTlRFRF9FREdFKCcnLCosKiwjMzUyLC5ULik7CiM0MjggPSBPUklFTlRFRF9FREdFKCcnLCosKiwjNDAxLC5ULik7CiM0MjkgPSBBRFZBTkNFRF9GQUNFKCcnLCgjNDMwKSwjNzIsLlQuKTsKIzQzMCA9IEZBQ0VfQk9VTkQoJycsIzQzMSwuVC4pOwojNDMxID0gRURHRV9MT09QKCcnLCgjNDMyLCM0MzMsIzQzNCwjNDM1LCM0MzYpKTsKIzQzMiA9IE9SSUVOVEVEX0VER0UoJycsKiwqLCM1NiwuVC4pOwojNDMzID0gT1JJRU5URURfRURHRSgnJywqLCosIzE0MiwuVC4pOwojNDM0ID0gT1JJRU5URURfRURHRSgnJywqLCosIzIyMSwuVC4pOwojNDM1ID0gT1JJRU5URURfRURHRSgnJywqLCosIzMwNCwuVC4pOwojNDM2ID0gT1JJRU5URURfRURHRSgnJywqLCosIzM3OSwuVC4pOwojNDM3ID0gKCBHRU9NRVRSSUNfUkVQUkVTRU5UQVRJT05fQ09OVEVYVCgzKSAKR0xPQkFMX1VOQ0VSVEFJTlRZX0FTU0lHTkVEX0NPTlRFWFQoKCM0NDEpKSBHTE9CQUxfVU5JVF9BU1NJR05FRF9DT05URVhUCigoIzQzOCwjNDM5LCM0NDApKSBSRVBSRVNFTlRBVElPTl9DT05URVhUKCdDb250ZXh0ICMxJywKICAnM0QgQ29udGV4dCB3aXRoIFVOSVQgYW5kIFVOQ0VSVEFJTlRZJykgKTsKIzQzOCA9ICggTEVOR1RIX1VOSVQoKSBOQU1FRF9VTklUKCopIFNJX1VOSVQoLk1JTExJLiwuTUVUUkUuKSApOwojNDM5ID0gKCBOQU1FRF9VTklUKCopIFBMQU5FX0FOR0xFX1VOSVQoKSBTSV9VTklUKCQsLlJBRElBTi4pICk7CiM0NDAgPSAoIE5BTUVEX1VOSVQoKikgU0lfVU5JVCgkLC5TVEVSQURJQU4uKSBTT0xJRF9BTkdMRV9VTklUKCkgKTsKIzQ0MSA9IFVOQ0VSVEFJTlRZX01FQVNVUkVfV0lUSF9VTklUKExFTkdUSF9NRUFTVVJFKDEuRS0wNyksIzQzOCwKICAnZGlzdGFuY2VfYWNjdXJhY3lfdmFsdWUnLCdjb25mdXNpb24gYWNjdXJhY3knKTsKIzQ0MiA9IFBST0RVQ1RfUkVMQVRFRF9QUk9EVUNUX0NBVEVHT1JZKCdwYXJ0JywkLCgjNykpOwpFTkRTRUM7CkVORC1JU08tMTAzMDMtMjE7Cg=="

// function to convert base64 to blob
const base64ToBlob = async (base64, type = 'text/html') => 
  fetch(`data:${type};base64,${base64}`)
  .then(res => res.blob())

// create blob from string above
const blobFile = await base64ToBlob(stepFile)

let shape = await importSTEP(blobFile)
console.log(shape) // check that result is DS_Solid


// shape = shape.fillet(5,(e)=>e.inDirection("Z"))
// shape = shape.fillet(5,(e)=>e.inPlane("XY",20))
let shapeRounded = shape.clone().fillet(8).mirror("XZ",10)

return [shape,shapeRounded]

}