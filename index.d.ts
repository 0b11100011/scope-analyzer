import Binding = require('./binding');
import Scope = require('./scope');
import * as acorn from 'acorn';

/**
 * Identifier AST node from acorn
 */
export type Identifier = acorn.Node & {
  type: 'Identifier';
  name: string;
};

/**
 * Create a new scope at the given AST node
 * @param node - The AST node to create a scope for
 * @param bindings - Optional array of binding names to pre-populate
 * @returns The created scope
 */
export function createScope(node: acorn.Node, bindings?: string[]): Scope;

/**
 * Visit a scope-defining node and register its bindings
 * @param node - The AST node to visit
 */
export function visitScope(node: acorn.Node): void;

/**
 * Visit a node and register any variable references
 * @param node - The AST node to visit
 */
export function visitBinding(node: acorn.Node): void;

/**
 * Analyze an AST and build scope information
 * @param ast - The root AST node to analyze
 * @returns The analyzed AST with scope information attached
 */
export function crawl(ast: acorn.Node): acorn.Node;

/**
 * Analyze an AST and build scope information (deprecated alias for crawl)
 * @param ast - The root AST node to analyze
 * @returns The analyzed AST with scope information attached
 * @deprecated Use crawl instead
 */
export function analyze(ast: acorn.Node): acorn.Node;

/**
 * Clear all scope information from an AST
 * @param ast - The AST to clear scope information from
 */
export function clear(ast: acorn.Node): void;

/**
 * Delete scope information from a single node
 * @param node - The node to delete scope information from
 */
export function deleteScope(node: acorn.Node): void;

/**
 * Get the nearest scope for a given node
 * @param node - The AST node
 * @param blockScope - Whether to consider block scopes
 * @returns The nearest scope node
 */
export function nearestScope(node: acorn.Node, blockScope?: boolean): acorn.Node;

/**
 * Get the scope attached to a node
 * @param node - The AST node
 * @returns The scope if one exists, null otherwise
 */
export function scope(node: acorn.Node): Scope | null;

/**
 * Get the binding for an identifier
 * @param identifier - The identifier AST node
 * @returns The binding if found, null otherwise
 */
export function getBinding(identifier: Identifier): Binding | null;
