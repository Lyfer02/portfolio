import { CheckCircle2, Mail, Send } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { z } from 'zod';
import { SITE, SOCIAL_LINKS } from '../../constants/content';
import { useTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { radii, spacing, typography } from '../../theme';
import type { ContactFormValues, NavSection } from '../../types';
import { submitContact } from '../../utils/api';
import { FadeIn } from '../animations/FadeIn';
import { GlassButton, GlassCard } from '../glass';
import { Section } from '../ui/Section';
import { GithubIcon, InstagramIcon, LinkedinIcon } from '../ui/SocialIcons';

type Props = {
  onLayout: (id: NavSection, event: any) => void;
};

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Enter a valid email'),
  subject: z.string().trim().min(3, 'Subject must be at least 3 characters'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters'),
});

const ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  mail: Mail,
} as const;

const INITIAL: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export function ContactSection({ onLayout }: Props) {
  const { theme } = useTheme();
  const { isDesktop } = useResponsive();
  const [values, setValues] = useState<ContactFormValues>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fields = useMemo(
    () =>
      [
        { key: 'name', label: 'Name', placeholder: 'Your name', multiline: false },
        { key: 'email', label: 'Email', placeholder: 'you@company.com', multiline: false },
        { key: 'subject', label: 'Subject', placeholder: 'Project inquiry', multiline: false },
        {
          key: 'message',
          label: 'Message',
          placeholder: 'Tell me about the opportunity or idea...',
          multiline: true,
        },
      ] as const,
    []
  );

  const onChange = (key: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setError(null);
  };

  const onSubmit = async () => {
    setSuccess(null);
    setError(null);
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof ContactFormValues, string>> = {};
      // zod v4 uses .issues
      for (const issue of parsed.error.issues) {
        const path = issue.path[0];
        if (typeof path === 'string' && !next[path as keyof ContactFormValues]) {
          next[path as keyof ContactFormValues] = issue.message;
        }
      }
      setErrors(next);
      return;
    }

    setLoading(true);
    try {
      const response = await submitContact(parsed.data);
      setSuccess(response.message);
      setValues(INITIAL);
    } catch (err: any) {
      if (err?.errors?.length) {
        const next: Partial<Record<keyof ContactFormValues, string>> = {};
        for (const item of err.errors) {
          next[item.path as keyof ContactFormValues] = item.message;
        }
        setErrors(next);
      }
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s build something luminous"
      description="Share a brief about your product, timeline, and goals. I usually reply within two business days."
      onLayout={(event) => onLayout('contact', event)}
    >
      <View style={[styles.grid, { flexDirection: isDesktop ? 'row' : 'column' }]}>
        <FadeIn style={styles.aside}>
          <GlassCard glow contentStyle={styles.asideContent}>
            <Text style={[styles.asideTitle, { color: theme.colors.text }]}>
              Direct channels
            </Text>
            <Text style={{ color: theme.colors.textSecondary, ...typography.body }}>
              Prefer email or socials? Reach out through any of these and I will follow up
              personally.
            </Text>
            <Pressable
              accessibilityRole="link"
              onPress={() => Linking.openURL(`mailto:${SITE.email}`)}
              style={[styles.emailChip, { borderColor: theme.colors.glassBorder }]}
            >
              <Mail size={16} color={theme.colors.accentSecondary} />
              <Text style={{ color: theme.colors.text }}>{SITE.email}</Text>
            </Pressable>
            <View style={styles.socials}>
              {SOCIAL_LINKS.map((link) => {
                const Icon = ICONS[link.icon];
                return (
                  <Pressable
                    key={link.id}
                    accessibilityRole="link"
                    accessibilityLabel={link.label}
                    onPress={() => Linking.openURL(link.url)}
                    style={[
                      styles.social,
                      {
                        borderColor: theme.colors.glassBorder,
                        backgroundColor: theme.colors.glass,
                      },
                    ]}
                  >
                    <Icon size={16} color={theme.colors.text} />
                    <Text style={{ color: theme.colors.textSecondary }}>{link.label}</Text>
                  </Pressable>
                );
              })}
            </View>
          </GlassCard>
        </FadeIn>

        <FadeIn delay={100} style={styles.formCol}>
          <GlassCard strong contentStyle={styles.form}>
            {fields.map((field) => (
              <View key={field.key} style={styles.field}>
                <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
                  {field.label}
                </Text>
                <TextInput
                  value={values[field.key]}
                  onChangeText={(text) => onChange(field.key, text)}
                  placeholder={field.placeholder}
                  placeholderTextColor={theme.colors.textMuted}
                  multiline={field.multiline}
                  numberOfLines={field.multiline ? 5 : 1}
                  textAlignVertical={field.multiline ? 'top' : 'center'}
                  keyboardType={field.key === 'email' ? 'email-address' : 'default'}
                  autoCapitalize={field.key === 'email' ? 'none' : 'sentences'}
                  accessibilityLabel={field.label}
                  style={[
                    styles.input,
                    field.multiline && styles.textarea,
                    {
                      color: theme.colors.text,
                      backgroundColor: theme.colors.input,
                      borderColor: errors[field.key]
                        ? theme.colors.danger
                        : theme.colors.inputBorder,
                    },
                  ]}
                />
                {errors[field.key] ? (
                  <Text style={{ color: theme.colors.danger, fontSize: 12 }}>
                    {errors[field.key]}
                  </Text>
                ) : null}
              </View>
            ))}

            {error ? <Text style={{ color: theme.colors.danger }}>{error}</Text> : null}
            {success ? (
              <View style={styles.success}>
                <CheckCircle2 size={18} color={theme.colors.success} />
                <Text style={{ color: theme.colors.success, flex: 1 }}>{success}</Text>
              </View>
            ) : null}

            <GlassButton
              label={loading ? 'Sending...' : 'Send message'}
              icon={<Send size={15} color="#fff" />}
              loading={loading}
              onPress={onSubmit}
            />
          </GlassCard>
        </FadeIn>
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: spacing.lg,
  },
  aside: {
    flex: 0.9,
  },
  asideContent: {
    gap: spacing.md,
  },
  asideTitle: {
    ...typography.h3,
  },
  emailChip: {
    borderWidth: 1,
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
  },
  socials: {
    gap: spacing.sm,
  },
  social: {
    borderWidth: 1,
    borderRadius: radii.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  formCol: {
    flex: 1.2,
  },
  form: {
    gap: spacing.md,
  },
  field: {
    gap: 6,
  },
  label: {
    ...typography.label,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderRadius: radii.md,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: 'DMSans_400Regular',
    fontSize: 15,
  },
  textarea: {
    minHeight: 140,
    paddingTop: 12,
  },
  success: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
