use starknet::ContractAddress;

#[derive(Copy, Drop, Serde, starknet::Store)]
pub struct Transaction {
    pub transaction_hash: ContractAddress,
    pub time_submitted: u64,
    pub submitted_by: ContractAddress
}

#[derive(Copy, Drop, Serde, starknet::Store)]
pub struct Rules {
    pub max_typing_speed: u64,
    pub min_amount: u256
}

#[starknet::interface]
pub trait IVigilantGuard<TContractState> {
    fn submit_transaction(ref self: TContractState, transaction_hash: ContractAddress);
    fn get_transactions(self: @TContractState) -> Array<Transaction>;
    fn set_rules(ref self: TContractState, max_typing_speed: u64, min_amount: u256);
    fn get_rules(self: @TContractState) -> Rules;
}

#[starknet::contract]
mod VigilantGuard {
    use starknet::event::EventEmitter;
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess, Map, StoragePathEntry};
    use super::{IVigilantGuard, Transaction, Rules};
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use core::num::traits::Zero;

    #[storage]
    struct Storage {
        last_tx_id: u256,
        transactions: Map::<u256, Transaction>,
        owner: ContractAddress,
        min_amount: u256,
        max_typing_speed: u64
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        TransactionSubmitted: TransactionSubmitted,
        RulesChanged: RulesChanged
    }

    #[derive(Drop, starknet::Event)]
    pub struct TransactionSubmitted {
        by: ContractAddress,
        at: u64,
        tx_id: u256
    }

    #[derive(Drop, starknet::Event)]
    pub struct RulesChanged {
        by: ContractAddress,
        at: u64
    }

    #[constructor]
    fn constructor(ref self: ContractState, max_typing_speed: u64, min_amount: u256, owner: ContractAddress) {
        self.last_tx_id.write(0);
        let caller = get_caller_address();
        self.owner.write(caller);
        self.max_typing_speed.write(max_typing_speed);
        self.min_amount.write(min_amount);
        self.owner.write(owner);
    }

    #[abi(embed_v0)]
    impl VigilantGuardImpl of IVigilantGuard<ContractState> {
        fn submit_transaction(ref self: ContractState, transaction_hash: ContractAddress) {
            let caller = get_caller_address();
            let last_tx_id = self.last_tx_id.read();
            assert(caller.is_non_zero(), 'Zero caller not allowed');
            let transaction = Transaction {
                transaction_hash,
                time_submitted: get_block_timestamp(),
                submitted_by: caller
            };
            self.transactions.entry(last_tx_id + 1).write(transaction);
            self.emit(
                TransactionSubmitted {
                    by: caller,
                    at: get_block_timestamp(),
                    tx_id: last_tx_id + 1,
                }
            );
            self.last_tx_id.write(last_tx_id + 1);
        }
        fn get_transactions(self: @ContractState) -> Array<Transaction> {
            let last_tx_id = self.last_tx_id.read();
            let mut transactions_array = array![];

            for i in 0..last_tx_id + 1 {
                let transaction = self.transactions.entry(i + 1).read();
                transactions_array.append(transaction);
            };

            transactions_array
        }
        fn set_rules(ref self: ContractState, max_typing_speed: u64, min_amount: u256) {
            let caller = get_caller_address();
            assert(caller == self.owner.read(), 'Only owner can call');
            self.max_typing_speed.write(max_typing_speed);
            self.min_amount.write(min_amount);
            self.emit(
                RulesChanged {
                    by: caller,
                    at: get_block_timestamp(),
                }
            )
        }
        fn get_rules(self: @ContractState) -> Rules {
            let rules = Rules {
                max_typing_speed: self.max_typing_speed.read(),
                min_amount: self.min_amount.read()
            };

            rules
        }
    }
}
