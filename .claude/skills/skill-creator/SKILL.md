# Skill Creator

A skill that helps users create new skills by guiding them through the process and generating complete SKILL.md files.

## Description

This skill assists users in creating new Claude Code skills by:
1. Asking what the skill does
2. Gathering trigger phrases
3. Generating a complete SKILL.md file with proper structure

## Trigger Phrases

- "create a new skill"
- "help me make a skill"
- "generate a skill for me"
- "build a skill"
- "make a new skill"

## Parameters

None required.

## Implementation

When invoked, this skill will:
1. Ask the user what the skill should do
2. Ask for potential trigger phrases that should activate the skill
3. Generate a properly formatted SKILL.md file with:
   - Title
   - Description
   - Trigger phrases
   - Parameters section (if applicable)
   - Implementation details
4. Provide the generated SKILL.md content for the user to save in the appropriate directory