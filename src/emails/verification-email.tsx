import * as React from "react"
import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface NextBaseConfirmEmailProps {
  userFirstname: string
  confirmLink: string
}

export const VerificationEmail = ({
  userFirstname,
  confirmLink,
}: NextBaseConfirmEmailProps) => (
  <Html>
    <Head>
      <Font
        fontFamily="Inter"
        fallbackFontFamily="Verdana"
        webFont={{
          url: "https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7SUc.woff2",
          format: "woff2",
        }}
        fontWeight={400}
        fontStyle="normal"
      />
    </Head>

    <Preview>Verify your email!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://imgur.com/1vvuJ76`}
          width="170"
          height="50"
          alt="Koala"
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Welcome to The NextBase, verify your email to be able to login and use
          our platform services.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href={confirmLink}>
            Verify your email
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The NextBase
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Putalisadak, KTM 44600</Text>
      </Container>
    </Body>
  </Html>
)

export const main = {
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

export const container = {
  backgroundColor: "#09090b",
  color: "#fff",
  margin: "0 auto",
  padding: "20px 48px",
  borderRadius: "8px",
}

export const logo = {
  margin: "0 auto",
}

export const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
}

const btnContainer = {
  textAlign: "center" as const,
}

export const button = {
  backgroundColor: "#fff",
  borderRadius: "3px",
  color: "#000",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
}

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
}
