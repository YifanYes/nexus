<?php

$finder = Symfony\Component\Finder\Finder::create()
    ->in([
      __DIR__ . '/app',
      __DIR__ . '/config',
      __DIR__ . '/database',
      __DIR__ . '/routes',
      __DIR__ . '/tests',
    ])
    ->name('*.php')
    ->ignoreDotFiles(true)
    ->ignoreVCS(true);

return (new PhpCsFixer\Config())
    ->setRules([
      '@PSR12' => true,
      'array_indentation' => true,
      'array_syntax' => ['syntax' => 'short'],
      'braces_position' => [
        'allow_single_line_anonymous_functions' => true,
        'allow_single_line_empty_anonymous_classes' => true,
        'anonymous_classes_opening_brace' => 'same_line',
        'anonymous_functions_opening_brace' => 'same_line',
        'classes_opening_brace' => 'same_line',
        'control_structures_opening_brace' => 'same_line',
        'functions_opening_brace' => 'same_line',
      ],
      'class_attributes_separation' => ['elements' => ['method' => 'one']],
      'combine_consecutive_unsets' => true,
      'concat_space' => ['spacing' => 'one'],
      'declare_equal_normalize' => true,
      'global_namespace_import' => true,
      'group_import' => true,
      'include' => true,
      'lambda_not_used_import' => false,
      'multiline_whitespace_before_semicolons' => false,
      'no_extra_blank_lines' => [
        'tokens' => [
          'break',
          'case',
          'curly_brace_block',
          'default',
          'extra',
          'parenthesis_brace_block',
          'return',
          'square_brace_block',
          'switch',
          'throw',
          'use',
        ],
      ],
      'no_leading_namespace_whitespace' => true,
      'no_leading_import_slash' => true,
      'no_multiline_whitespace_around_double_arrow' => true,
      'no_spaces_around_offset' => true,
      'no_trailing_whitespace' => true,
      'no_trailing_whitespace_in_comment' => true,
      'no_unneeded_import_alias' => true,
      'no_unused_imports' => true,
      'no_useless_return' => true,
      'no_whitespace_before_comma_in_array' => true,
      'no_whitespace_in_blank_line' => true,
      'object_operator_without_whitespace' => true,
      'ordered_imports' => true,
      'single_import_per_statement' => false,
      'single_line_comment_style' => ['comment_types' => ['hash']],
      'single_quote' => true,
      'single_trait_insert_per_statement' => false,
      'space_after_semicolon' => true,
      'ternary_operator_spaces' => true,
      'trim_array_spaces' => true,
      'trailing_comma_in_multiline' => false,
      'type_declaration_spaces' => true,
      'unary_operator_spaces' => true,
      'whitespace_after_comma_in_array' => true
    ])
    ->setIndent('  ')
    ->setLineEnding("\n")
    ->setFinder($finder);
